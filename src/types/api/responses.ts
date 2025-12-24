import {
  AttemptWithAnswers,
  GetAttemptDetails,
  LocalizationWithQuestions,
  QuizWithLocalization,
  QuizWithoutLocalization,
  RecentAttempt,
  ReviewWithUser,
  SearchQuizResult,
  UserWithPreference,
} from "@/lib/types/index";

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

export type QuizResponse = ApiResponse<QuizWithLocalization>;
export type QuizzesResponse = ApiResponse<QuizWithoutLocalization[]>;
export type RecentListResponse = ApiResponse<RecentAttempt[]>;
export type RecentItemResponse = ApiResponse<RecentAttempt>;
export type SearchResponse = ApiResponse<SearchQuizResult[]>;
export type GetAttemptResponse = ApiResponse<GetAttemptDetails>;

export type AttemptDetailResponse = ApiResponse<{
  attempt: AttemptWithAnswers;
  localization: LocalizationWithQuestions;
}>;

export type AttemptsResponse = ApiResponse<AttemptWithAnswers[]>;
export type ReviewResponse = ApiResponse<ReviewWithUser>;
export type UserWithPreferenceResponse = ApiResponse<UserWithPreference>;
export type DeleteAccountResponse = ApiResponse<{ message: string }>;

export type ReviewsResponse = ApiResponse<{
  reviews: ReviewWithUser[];
  averageRating: number;
  total: number;
  userReview?: ReviewWithUser | null;
}>;
