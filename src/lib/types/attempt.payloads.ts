import { Prisma } from "@/app/generated/prisma";
import {
  attemptWithAnswersInclude,
  getAttemptPayload,
  recentAttemptInclude,
} from "./attempt.includes";

type AttemptWithAnswersPayload = Prisma.AttemptGetPayload<{
  include: typeof attemptWithAnswersInclude;
}>;

type RecentAttemptPayload = Prisma.AttemptGetPayload<{
  include: typeof recentAttemptInclude;
}>;

type GetAttemptDetailsPayload = Prisma.AttemptGetPayload<{
  select: typeof getAttemptPayload;
}>;

export type AttemptWithAnswers = AttemptWithAnswersPayload;
export type RecentAttempt = RecentAttemptPayload;
export type GetAttemptDetails = GetAttemptDetailsPayload;
