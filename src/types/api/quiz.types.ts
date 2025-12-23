import z from "zod";
import { attachmentSchema, questionSchema, optionSchema } from "./quiz.schemas";

export type QuestionInput = z.infer<typeof questionSchema>;
export type AttachmentInput = z.infer<typeof attachmentSchema>;
export type OptionInput = z.infer<typeof optionSchema> & {
  attachments: AttachmentInput[];
};
