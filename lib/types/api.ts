import { Prisma } from "@/app/generated/prisma";

export const quizWithLocalizationInclude = {
  localizations: {
    include: {
      questions: {
        include: {
          options: {
            include: { attachments: {} },
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

export const userBasics = {
  id: true,
  name: true,
  username: true,
  image: true,
} satisfies Prisma.UserSelect;

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

//FOR FRONT END ONLY

export type UserBasic = Prisma.UserGetPayload<{
  select: typeof userBasics;
}>;

export type QuizWithLocalization = Prisma.QuizGetPayload<{
  include: typeof quizWithLocalizationInclude;
}>;

export type QuizWithoutLocalization = Prisma.QuizGetPayload<{
  include: typeof quizWithoutLocalizationInclude;
}>;

export type QuizCreator = QuizWithLocalization["createdBy"];
export type QuizLocalization = QuizWithLocalization["localizations"][number];
export type QuizQuestion = QuizLocalization["questions"][number];
export type QuizOption = QuizQuestion["options"][number];
export type QuizAttachment = QuizQuestion["attachments"][number];

//FOR BACKED ONLY
export type QuizResponse = ApiResponse<QuizWithLocalization>;
export type QuizzesResponse = ApiResponse<QuizWithoutLocalization[]>;

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      pagination?: {
        limit: number;
        cursor: string | null;
        nextCursor: string | null;
        hasMore: boolean;
      };
    }
  | { success: false; error: { message: string; code?: string } };
