import { Prisma } from "@/app/generated/prisma";

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

export const reviewWithUserInclude = {
  user: { select: userBasics },
} satisfies Prisma.ReviewInclude;

export const getUserWithPreference = {
  id: true,
  name: true,
  username: true,
  image: true,
  isActive: true,
  email: true,
  emailVerified: true,
  images: true,
  role: true,
  notificationSettings: true,
  userPreferences: true,
  accounts: true,
} satisfies Prisma.UserSelect;

export const getUserWithAccounts = {
  id: true,
  name: true,
  username: true,
  image: true,
  isActive: true,
  email: true,
  emailVerified: true,
  images: true,
  role: true,
  accounts: true,
  notificationSettings: true,
  userPreferences: true,
} satisfies Prisma.UserSelect;

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

export type UserWithPreference = Prisma.UserGetPayload<{
  include: typeof getUserWithPreference;
}>;

export type UserPreferences = UserWithPreference["userPreferences"];
export type NotificationPreferences =
  UserWithPreference["notificationSettings"];

export type QuizCreator = QuizWithLocalization["createdBy"];
export type QuizLocalization = QuizWithLocalization["localizations"][number];
export type QuizQuestion = QuizLocalization["questions"][number];
export type QuizOption = QuizQuestion["options"][number];
export type QuizAttachment = QuizQuestion["attachments"][number];

export type LocalizationWithQuestions = Prisma.QuizLocalizationGetPayload<{
  include: typeof localizationWithQuestionsInclude;
}>;

export type AttemptWithAnswers = Prisma.AttemptGetPayload<{
  include: typeof attemptWithAnswersInclude;
}>;

export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: typeof reviewWithUserInclude;
}>;

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

export type RecentAttempt = Prisma.AttemptGetPayload<{
  include: typeof recentAttemptInclude;
}>;

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

export type SearchQuizResult = Prisma.QuizLocalizationGetPayload<{
  include: typeof searchQuizInclude;
}>;

//FOR BACKED ONLY
export type QuizResponse = ApiResponse<QuizWithLocalization>;
export type QuizzesResponse = ApiResponse<QuizWithoutLocalization[]>;
export type RecentListResponse = ApiResponse<RecentAttempt[]>;
export type RecentItemResponse = ApiResponse<RecentAttempt>;
export type SearchResponse = ApiResponse<SearchQuizResult[]>;
export type AttemptDetailResponse = ApiResponse<{
  attempt: AttemptWithAnswers;
  localization: LocalizationWithQuestions;
}>;
export type AttemptsResponse = ApiResponse<AttemptWithAnswers[]>;
export type ReviewResponse = ApiResponse<ReviewWithUser>;
export type UserWithPreferenceResponse = ApiResponse<UserWithPreference>;
export type DeleteAccountResponse = ApiResponse<{ message: string }>;

// API RESPONSE TYPE
export type ReviewsResponse = ApiResponse<{
  reviews: ReviewWithUser[];
  averageRating: number;
  total: number;
  userReview?: ReviewWithUser | null;
}>;

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
