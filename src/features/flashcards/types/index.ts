import { QuizCreator, QuizQuestion, QuizWithLocalization } from "@/lib/types";

export interface FlashcardCard {
  id: string;
  term: string;
  definition: string;
  hint?: string;
  explanation?: string;
}

export interface FlashcardSetsProps {
  classname?: string;
  questionsProp?: QuizQuestion[];
}

export interface FlashCardSetsHeaderButtonRowProps {
  classname: string;
}

export interface FlashcardSetsHeaderProps {
  quiz: QuizWithLocalization;
}

export interface UserAvatarIconProps {
  classname: string;
  user: QuizCreator;
  createdAt: Date;
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

export interface FlashcardTestHeaderProps {
  quiz: QuizWithLocalization;
}
