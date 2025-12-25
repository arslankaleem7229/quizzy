import { useState, useCallback } from "react";
import { QuestionStatus } from "../types";
import { QuizQuestion } from "@/lib/types";

export interface UseLearnStateReturn {
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  attemptId: string | null;
  setAttemptId: React.Dispatch<React.SetStateAction<string | null>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedOptionId: string | null;
  setSelectedOptionId: React.Dispatch<React.SetStateAction<string | null>>;
  feedbackStatus: QuestionStatus | null;
  setFeedbackStatus: React.Dispatch<
    React.SetStateAction<QuestionStatus | null>
  >;
  feedbackCorrectIds: string[];
  setFeedbackCorrectIds: React.Dispatch<React.SetStateAction<string[]>>;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  resetFeedback: () => void;
  goToNextQuestion: (nextIndex?: number) => void;
  currentQuestion: QuizQuestion | undefined;
}

export function useLearnState(
  initialQuestions: QuizQuestion[] = []
): UseLearnStateReturn {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<QuestionStatus | null>(
    null
  );
  const [feedbackCorrectIds, setFeedbackCorrectIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const resetFeedback = useCallback(() => {
    setSelectedOptionId(null);
    setFeedbackStatus(null);
    setFeedbackCorrectIds([]);
  }, []);

  const goToNextQuestion = useCallback(
    (nextIndex?: number) => {
      const maxIndex = Math.max(questions.length - 1, 0);

      if (typeof nextIndex === "number") {
        if (nextIndex > maxIndex) {
          setIsCompleted(true);
          return;
        }
        setCurrentIndex(Math.min(nextIndex, maxIndex));
        return;
      }

      if (currentIndex >= maxIndex) {
        setIsCompleted(true);
        return;
      }

      setCurrentIndex(currentIndex + 1);
    },
    [currentIndex, questions.length]
  );

  return {
    questions,
    setQuestions,
    attemptId,
    setAttemptId,
    currentIndex,
    setCurrentIndex,
    selectedOptionId,
    setSelectedOptionId,
    feedbackStatus,
    setFeedbackStatus,
    feedbackCorrectIds,
    setFeedbackCorrectIds,
    isCompleted,
    setIsCompleted,
    resetFeedback,
    goToNextQuestion,
    currentQuestion,
  };
}
