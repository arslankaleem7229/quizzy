"use client";
import { useCallback, useEffect, useState } from "react";

import { QuizQuestion } from "@/lib/types";
import { UseFlashcardTestParams, UseFlashcardTestResult } from "../types";
import { fetchSpecificQuiz } from "../services/fetchQuiz";

export function useFlashcardTest({
  quizId,
  language,
  initialQuestions,
}: UseFlashcardTestParams): UseFlashcardTestResult {
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    initialQuestions ?? []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialQuestions?.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuestions?.length) {
      setQuestions(initialQuestions);
      setIsLoading(false);
    }
  }, [initialQuestions]);

  useEffect(() => {
    if (questions.length) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [questions.length]);

  useEffect(() => {
    if (initialQuestions?.length) return;
    if (!quizId) return;

    const resolvedQuizId = Array.isArray(quizId) ? quizId[0] : quizId;

    const fetchQuiz = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchSpecificQuiz(resolvedQuizId, language);
        if (response.error) setError(response.error);
        else if (response.questions) setQuestions(response.questions);
      } catch {
        setError("Failed to load quiz");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [language, initialQuestions?.length, quizId]);

  const goToNext = useCallback(() => {
    if (!questions.length) return;
    setIsFlipped(false);
    if (currentIndex === questions.length - 1) {
      setIsCompleted(true);
      return;
    }
    setCurrentIndex((next) => (next + 1) % questions.length);
  }, [currentIndex, questions.length]);

  const goToPrevious = useCallback(() => {
    if (!questions.length) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
  }, [questions.length]);

  const restart = useCallback(() => {
    setIsCompleted(false);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const exitCompletion = useCallback(() => {
    setIsCompleted(false);
  }, []);

  const currentCard = questions[currentIndex] ?? null;
  const totalQuestions = questions.length;

  return {
    questions,
    currentCard,
    currentIndex,
    isFlipped,
    isCompleted,
    isLoading,
    error,
    totalQuestions,
    setIsFlipped,
    goToNext,
    goToPrevious,
    restart,
    exitCompletion,
  };
}
