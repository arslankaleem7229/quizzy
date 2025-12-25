import { Prisma } from "@/app/generated/prisma";
import { userBasics } from "./user.selects";

export const quizWithLocalizationInclude = {
  localizations: {
    include: {
      questions: {
        include: {
          options: {
            include: { attachments: true },
            orderBy: { orderIndex: "asc" as const },
          },
          attachments: true,
        },
      },
    },
  },
  reviews: true,
  createdBy: {
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
    },
  },
} satisfies Prisma.QuizInclude;

export const quizWithoutLocalizationInclude = {
  localizations: false,
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      image: true,
    },
  },
} satisfies Prisma.QuizInclude;

export const localizationWithQuestionsInclude = {
  questions: {
    include: {
      options: {
        include: { attachments: true },
        orderBy: { orderIndex: "asc" as const },
      },
      attachments: true,
    },
    orderBy: { orderIndex: "asc" as const },
  },
} satisfies Prisma.QuizLocalizationInclude;

export const searchQuizInclude = {
  quiz: {
    select: {
      id: true,
      slug: true,
      totalQuestions: true,
      createdBy: { select: userBasics },
    },
  },
} satisfies Prisma.QuizLocalizationInclude;
