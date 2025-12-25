import { QuizQuestion } from "@/lib/types";

export type QuestionStatus = "correct" | "wrong";

export type OptionState = "idle" | "selected" | "correct" | "wrong";

export interface LearnState {
  questions: QuizQuestion[];
  attemptId: string | null;
  currentIndex: number;
  selectedOptionId: string | null;
  feedbackStatus: QuestionStatus | null;
  feedbackCorrectIds: string[];
  isCompleted: boolean;
}

export interface StartAttemptResult {
  attemptId: string;
  questions: QuizQuestion[];
  statuses: Record<string, QuestionStatus>;
}

export interface SubmitAnswerParams {
  attemptId: string;
  questionId: string;
  selectedOptionId: string;
}

export interface SubmitAnswerResult {
  attemptId: string;
  questions: QuizQuestion[];
  isCorrect: boolean;
}
