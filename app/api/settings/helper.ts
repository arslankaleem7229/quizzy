import { uploadFileToS3 } from "@/lib/utils/uploadToS3";
import { BadRequestError } from "../quizz/question.helper";

export async function resolveProfilePictureAttachment(
  formData: FormData | null
): Promise<string> {
  if (!formData) {
    throw new BadRequestError(
      "Attachments with files require multipart/form-data and a fileKey"
    );
  }

  const key = "profilePicture";
  if (!key) {
    throw new BadRequestError(
      "Attachment missing fileKey to locate uploaded file"
    );
  }

  const file = formData.get(key);
  if (!(file instanceof File)) {
    throw new BadRequestError(`File "${key}" not found in form-data`);
  }

  const uploadedUrl = await uploadFileToS3({ file, bucketType: "user-images" });

  if (!uploadedUrl) {
    throw new Error(`Failed to upload attachment "${file.name}"`);
  }

  return uploadedUrl;
}
