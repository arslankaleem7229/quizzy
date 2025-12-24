import { QuizCreator, QuizWithLocalization } from "@/lib/types";

export interface FlashcardCard {
  id: string;
  term: string;
  definition: string;
  hint?: string;
  explanation?: string;
}

export interface UserAvatarIconProps {
  classname: string;
  user: QuizCreator;
  createdAt: Date;
}

export interface FlashcardSetsHeaderProps {
  quiz: QuizWithLocalization;
}

export interface UserAvatarIconProps {
  classname: string;
  user: QuizCreator;
  createdAt: Date;
}

export interface FetchFlashcardsPayload {
  id: string;
  language: string;
}

export interface CreateAttemptPayload {
  quizId: string;
  language: string;
}

export interface FlashcardSetHeaderProps {
  quiz: QuizWithLocalization;
}
