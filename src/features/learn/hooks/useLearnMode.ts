import { useEffect, useRef, useState, useCallback } from "react";

import { fetchQuiz } from "../services/fetchQuizz";
import { useLearnState } from "./useLearnState";
import { QuizQuestion } from "@/lib/types";
import { startAttempt } from "../services/startAttempt";
import { submitAnswer } from "../services/submitAnswer";

export interface UseLearnModeParams {
  quizId: string;
  language: string;
  initialQuestions?: QuizQuestion[];
}

export interface UseLearnModeReturn {
  questions: QuizQuestion[];
  attemptId: string | null;
  currentQuestion: QuizQuestion | undefined;
  currentIndex: number;
  selectedOptionId: string | null;
  feedbackStatus: "correct" | "wrong" | null;
  feedbackCorrectIds: string[];
  isCompleted: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  handleAnswer: (optionId: string) => Promise<void>;
  resetFeedback: () => void;
  goToNextQuestion: (nextIndex?: number) => void;
}

export function useLearnMode({
  quizId,
  language,
  initialQuestions = [],
}: UseLearnModeParams): UseLearnModeReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
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
    resetFeedback,
    goToNextQuestion,
    currentQuestion,
  } = useLearnState(initialQuestions);

  useEffect(() => {
    let cancelled = false;

    const loadQuiz = async () => {
      if (!quizId) {
        setError("Quiz id missing");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const remainingQuestions = await fetchQuiz(quizId, language);

        const attemptResult = await startAttempt(quizId, language);

        if (cancelled) return;

        const resolvedQuestions =
          attemptResult?.questions?.length && attemptResult.questions.length > 0
            ? attemptResult.questions
            : remainingQuestions;

        if (attemptResult) {
          setAttemptId(attemptResult.attemptId);
          const firstUnanswered = resolvedQuestions.findIndex(
            (q) => !attemptResult.statuses[q.id]
          );
          setCurrentIndex(firstUnanswered === -1 ? 0 : firstUnanswered);
        } else {
          setCurrentIndex(0);
        }

        setQuestions(resolvedQuestions);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load quiz");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadQuiz();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [quizId, language, setQuestions, setAttemptId, setCurrentIndex]);

  const handleAnswer = useCallback(
    async (optionId: string) => {
      if (!currentQuestion || isSubmitting) return;
      if (!quizId) {
        setError("Quiz id missing");
        return;
      }

      let activeAttemptId = attemptId;
      if (!attemptId) {
        try {
          const attemptResult = await startAttempt(quizId, language);
          if (!attemptResult) return;
          activeAttemptId = attemptResult.attemptId;
          setAttemptId(attemptResult.attemptId);
          setQuestions(attemptResult.questions);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to start attempt"
          );
          return;
        }
      }

      setSelectedOptionId(optionId);
      setIsSubmitting(true);
      const currentCorrectIds = currentQuestion.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.id);
      setFeedbackCorrectIds(currentCorrectIds);

      try {
        const result = await submitAnswer({
          attemptId: activeAttemptId!,
          questionId: currentQuestion.id,
          selectedOptionId: optionId,
        });

        setAttemptId(result.attemptId);
        setQuestions(result.questions);
        setFeedbackStatus(result.isCorrect ? "correct" : "wrong");

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          goToNextQuestion(currentIndex + 1);
          resetFeedback();
          setIsSubmitting(false);
        }, 1000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to submit answer"
        );
        setIsSubmitting(false);
      }
    },
    [
      currentQuestion,
      isSubmitting,
      quizId,
      attemptId,
      language,
      setAttemptId,
      setQuestions,
      setSelectedOptionId,
      setFeedbackCorrectIds,
      setFeedbackStatus,
      goToNextQuestion,
      currentIndex,
      resetFeedback,
    ]
  );

  return {
    questions,
    attemptId,
    currentQuestion,
    currentIndex,
    selectedOptionId,
    feedbackStatus,
    feedbackCorrectIds,
    isCompleted,
    isLoading,
    isSubmitting,
    error,
    handleAnswer,
    resetFeedback,
    goToNextQuestion,
  };
}
