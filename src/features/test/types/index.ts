import { QuizQuestion } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

export interface UseFlashcardTestParams {
  quizId?: string | string[];
  language: string;
  initialQuestions?: QuizQuestion[];
}

export interface TestFlashcardProps {
  currentCard: QuizQuestion;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UseFlashcardTestResult {
  questions: QuizQuestion[];
  currentCard: QuizQuestion | null;
  currentIndex: number;
  isFlipped: boolean;
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;
  totalQuestions: number;
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
  goToNext: () => void;
  goToPrevious: () => void;
  restart: () => void;
  exitCompletion: () => void;
}
export interface ActionsRequiredProps {
  onRestart?: () => void;
  quizId: string | null | undefined;
  attemptId?: string | null | undefined;
}

export interface ResultStatsProps {
  totalQuestions?: number;
  completedCount?: number;
  quizId: string | null | undefined;
  attemptId?: string | null | undefined;
}

export interface FlashcardNavButtonProps {
  isLeft: boolean;
  handleAction: () => void;
}

export interface CompletedProps {
  totalQuestions?: number;
  completedCount?: number;
  remainingQuestion?: number;
  quizId: string | null | undefined;
  attemptId?: string | null | undefined;
  onRestart?: () => void;
  onBack?: () => void;
}

export interface AttemptResult {
  maxScore: number;
  obtainedScore: number;
}

export interface FlashcardTestPageProps {
  quizId: string;
  language: string;
  classname?: string;
  questionsProp?: QuizQuestion[];
}

export interface FlashCardTestHeaderButtonRowProps {
  classname: string;
}

export interface FetchQuizResult {
  questions?: QuizQuestion[];
  error?: string;
}
