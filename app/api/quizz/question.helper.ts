import { uploadFileToS3 } from "@/lib/utils/uploadToS3";
import { AttachmentInput, QuestionInput } from "./quizz.types";

export class BadRequestError extends Error {}

export async function resolveAttachmentUrl(
  attachment: AttachmentInput,
  formData: FormData | null
): Promise<AttachmentInput & { url: string }> {
  if (attachment.url) return attachment as AttachmentInput & { url: string };

  if (!formData) {
    throw new BadRequestError(
      "Attachments with files require multipart/form-data and a fileKey"
    );
  }

  const key = attachment.fileKey ?? attachment.fileName;
  if (!key) {
    throw new BadRequestError(
      "Attachment missing fileKey to locate uploaded file"
    );
  }

  const file = formData.get(key);
  if (!(file instanceof File)) {
    throw new BadRequestError(`File "${key}" not found in form-data`);
  }

  const uploadedUrl = await uploadFileToS3({ file });

  if (!uploadedUrl) {
    throw new Error(`Failed to upload attachment "${file.name}"`);
  }

  return {
    ...attachment,
    url: uploadedUrl,
    fileName: attachment.fileName ?? file.name,
    mimeType: attachment.mimeType ?? file.type,
  };
}

export async function prepareQuestionsWithUploads(
  questions: QuestionInput[],
  formData: FormData | null
) {
  return Promise.all(
    questions.map(async (question) => {
      const questionAttachments = await Promise.all(
        (question.attachments?.question ?? []).map((att) =>
          resolveAttachmentUrl(att, formData)
        )
      );
      const answerAttachments = await Promise.all(
        (question.attachments?.answer ?? []).map((att) =>
          resolveAttachmentUrl(att, formData)
        )
      );
      const options = question.options
        ? await Promise.all(
            question.options.map(async (opt) => ({
              ...opt,
              attachments: await Promise.all(
                (opt.attachments ?? []).map((att) =>
                  resolveAttachmentUrl(att, formData)
                )
              ),
            }))
          )
        : undefined;

      return {
        ...question,
        options,
        attachments:
          questionAttachments.length || answerAttachments.length
            ? { question: questionAttachments, answer: answerAttachments }
            : undefined,
      };
    })
  );
}
