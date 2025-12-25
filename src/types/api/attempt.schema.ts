import { AttemptStatus } from "@/app/generated/prisma";
import z from "zod";

export const startAttemptSchema = z.object({
  quizId: z.string().min(1),
  language: z.string().min(1).optional(),
  isNew: z.boolean().optional().default(true),
});

export const updateAttemptSchema = z.object({
  status: z.enum(AttemptStatus).optional(),
  timeSpent: z.number().int().nonnegative().optional(),
});

export const submitAnswerSchema = z.object({
  questionId: z.string().min(1),
  selectedOptionIds: z.array(z.string()).default([]),
});
