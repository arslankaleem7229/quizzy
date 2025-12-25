import { QuizWithoutLocalization, RecentAttempt } from "@/lib/types";

// Job-related types
export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface JobState {
  jobId: string;
  status: JobStatus;
  message?: string;
  error?: string;
  quizId?: string;
}

export interface JobUpdatePayload {
  jobId: string;
  status: string;
  message?: string;
  error?: string;
  quizId?: string;
}

export type AiJobResponse =
  | {
      success: true;
      data: {
        jobId: string;
        status: string;
        message?: string;
        estimatedTime?: string;
      };
    }
  | {
      success: false;
      error: { message: string };
    };

export type JobsListResponse =
  | {
      success: true;
      data: {
        id: string;
        status: string;
        title?: string | null;
        description?: string | null;
        errorMessage?: string | null;
        quizId?: string | null;
      }[];
    }
  | { success: false; error: { message: string } };

// Component props types
export interface JobStatusBannerProps {
  status: JobStatus;
  message?: string;
  error?: string;
  onDismiss?: () => void;
  autoHideDuration?: number;
  actionLabel?: string;
  onAction?: () => void;
  stylingProps: string;
}

export interface ProgressBarProps {
  totalQuestions: number;
  currentQuestion: number;
}

export interface PopularFlashCardsProps {
  flashcards: QuizWithoutLocalization[];
}

export interface FlashcardSetCardProps {
  quizz: QuizWithoutLocalization;
}

export interface RecentAttemptCardProps {
  attempt: RecentAttempt;
  localization: {
    title?: string | null;
    description?: string | null;
    questionCount?: number | null;
  };
  formattedDate: string;
}

export interface PopularTextbooksProps {
  classname?: string;
}

export interface FileUploadButtonProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

// Data types
export interface Textbook {
  title: string;
  edition: string;
  authors: string;
  solutions: string;
  cover: string;
}

export interface TextbookCardProps {
  book: Textbook;
}
