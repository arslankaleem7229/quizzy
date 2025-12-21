import z from "zod";
import { AttemptStatus } from "@/app/generated/prisma/client";

const recentAttemptSchema = z.object({
  quizId: z.string().min(1),
  language: z.string().min(1).optional(),
  status: z.enum(AttemptStatus).default("IN_PROGRESS").optional(),
});

export type RecentAttemptPayload = z.infer<typeof recentAttemptSchema>;

export default recentAttemptSchema;
