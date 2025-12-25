import { AttachmentType } from "@/app/generated/prisma";
import { QuizQuestion } from "@/lib/types";

export function getCorrectValues(question: QuizQuestion) {
  return question.options
    .filter((o) => o.isCorrect)
    .map((o) => {
      return o.hasAttachment ? o.attachments[0].url : o.optionText + "\n\n";
    });
}
export function getCorrectAttachments(question: QuizQuestion) {
  return question.options
    .filter((o) => o.isCorrect && o.hasAttachment)
    .map((o) => o.attachments[0].url);
}

export function getQuestionImages(question: QuizQuestion) {
  return question.attachments
    .filter((a) => a.attachmentType === AttachmentType.QUESTION_IMAGE)
    .map((a) => {
      return a.url;
    });
}
