import { AttachmentInput, QuestionInput, OptionInput } from "@/types/api";

export function normalizeOptions(
  question: QuestionInput,
  fallbackAttachments?: AttachmentInput[]
): OptionInput[] {
  const provided =
    question.options?.map((opt) => ({
      ...opt,
      attachments: opt.attachments ?? [],
    })) ?? [];

  const options =
    provided.length > 0
      ? provided
      : [
          {
            optionText: question.definition,
            isCorrect: true,
            orderIndex: 0,
            attachments: fallbackAttachments ?? [],
          },
        ];

  if (!options.some((opt) => opt.isCorrect)) {
    throw new Error("Each question must include at least one correct option");
  }

  return options.map((opt, index) => ({
    ...opt,
    orderIndex: opt.orderIndex ?? index,
    attachments: opt.attachments ?? [],
  }));
}
