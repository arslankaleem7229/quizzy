import z from "zod";
import { AttachmentType, QuestionType } from "@/app/generated/prisma/client";

export const attachmentSchema = z
  .object({
    url: z.url().optional(),
    fileKey: z.string().optional(),
    fileName: z.string().optional(),
    mimeType: z.string().optional(),
    attachmentType: z.enum(AttachmentType),
  })
  .refine(
    (value) => Boolean(value.url || value.fileKey),
    "Attachment requires either a url or fileKey"
  );

export const optionSchema = z.object({
  optionText: z.string().min(1),
  isCorrect: z.boolean().default(false),
  orderIndex: z.number().int().nonnegative().optional(),
  attachments: z.array(attachmentSchema).optional(),
});

export const questionSchema = z.object({
  term: z.string().min(1),
  definition: z.string().min(1),
  hint: z.string().optional(),
  explanation: z.string().optional(),
  questionType: z.enum(QuestionType).optional(),
  options: z.array(optionSchema).optional(),
  attachments: z
    .object({
      question: z.array(attachmentSchema).optional(),
      answer: z.array(attachmentSchema).optional(),
    })
    .optional(),
});

export const createFlashcardSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  language: z.string().min(1).default("en"),
  slug: z.string().optional(),
  isPublished: z.boolean().optional(),
  questions: z.array(questionSchema).min(1),
});

export type QuestionInput = z.infer<typeof questionSchema>;
export type AttachmentInput = z.infer<typeof attachmentSchema>;
export type OptionInput = z.infer<typeof optionSchema> & {
  attachments: AttachmentInput[];
};
