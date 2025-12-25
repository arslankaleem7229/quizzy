"use client";

import { useMemo, useCallback, useRef } from "react";
import ProgressBar from "@/features/latest/components/ProgressBar";
import { Completed } from "@/features/test/components/Completed";
import { useLearnMode } from "../hooks/useLearnMode";
import { calculateOptionState } from "../utils/calculateOptionState";
import { QuestionOption } from "./QuestionOption";
import { QuestionActions } from "./QuestionActions";
import { QuizQuestion } from "@/lib/types";

export interface LearnModeProps {
  quizId: string;
  language: string;
  initialQuestions?: QuizQuestion[];
}

export function LearnMode({
  quizId,
  language,
  initialQuestions,
}: LearnModeProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
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
  } = useLearnMode({ quizId, language, initialQuestions });

  const handleSkip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    goToNextQuestion();
    resetFeedback();
  }, [goToNextQuestion, resetFeedback]);

  const optionStates = useMemo(() => {
    if (!currentQuestion) return {};
    return currentQuestion.options.reduce((acc, option) => {
      acc[option.id] = calculateOptionState(
        option,
        feedbackStatus,
        selectedOptionId,
        feedbackCorrectIds
      );
      return acc;
    }, {} as Record<string, ReturnType<typeof calculateOptionState>>);
  }, [currentQuestion, feedbackStatus, selectedOptionId, feedbackCorrectIds]);

  if (isCompleted) {
    return (
      <Completed
        attemptId={attemptId}
        quizId={quizId}
        totalQuestions={questions.length}
        onRestart={() => {}}
        onBack={() => {}}
      />
    );
  }

  return (
    <section className="flex flex-1 flex-col max-w-7xl items-center mx-auto px-4 pb-10 pt-6 lg:px-14">
      <div className="mt-8 flex w-full flex-col gap-6">
        <ProgressBar
          totalQuestions={questions.length}
          currentQuestion={currentIndex}
        />

        <div className="flex flex-col rounded-xl bg-(--capsule) px-8 py-5 gap-5 min-h-[60vh]">
          {isLoading ? (
            <p className="text-sm text-(--grayText)">Loading questions...</p>
          ) : error ? (
            <p className="text-sm text-rose-400">{error}</p>
          ) : currentQuestion ? (
            <>
              <div>
                <span className="text-sm">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              <h1 className="flex-1 flex text-xl tracking-wide font-light">
                {currentQuestion.questionText}
              </h1>

              <div className="flex-3 flex flex-col gap-3 justify-end">
                <p className="text-sm text-(--grayText)">Choose an answer</p>
                <div className="grid gap-4 md:grid-cols-2">
                  {currentQuestion.options.map((option, idx) => (
                    <QuestionOption
                      key={option.id}
                      option={option}
                      index={idx}
                      state={optionStates[option.id] || "idle"}
                      isDisabled={isSubmitting || !!feedbackStatus}
                      onClick={() => handleAnswer(option.id)}
                      showFeedbackIcon={
                        !!feedbackStatus &&
                        (feedbackCorrectIds.includes(option.id) ||
                          selectedOptionId === option.id)
                      }
                      isCorrect={feedbackCorrectIds.includes(option.id)}
                    />
                  ))}
                </div>
              </div>

              <QuestionActions onSkip={handleSkip} />
            </>
          ) : (
            <p className="text-sm text-(--grayText)">
              No questions available for this quiz.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
