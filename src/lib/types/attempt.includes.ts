import { Prisma } from "@/app/generated/prisma";
import { userBasics } from "./user.selects";

export const attemptWithAnswersInclude = {
  answers: true,
  quiz: {
    select: {
      id: true,
      slug: true,
      createdById: true,
    },
  },

  user: { select: userBasics },
} satisfies Prisma.AttemptInclude;

export const getAttemptPayload = {
  maxScore: true,
  score: true,
  language: true,
  percentage: true,
  answers: true,
  quizId: true,
  quiz: {
    select: {
      createdBy: true,
    },
  },
} satisfies Prisma.AttemptSelect;

export const recentAttemptInclude = {
  ...attemptWithAnswersInclude,
  quiz: {
    select: {
      id: true,
      slug: true,
      createdById: true,
      localizations: {
        select: {
          language: true,
          title: true,
          description: true,
          questionCount: true,
        },
      },
    },
  },
} satisfies Prisma.AttemptInclude;
