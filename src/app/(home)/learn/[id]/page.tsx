"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FlagIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  AttemptDetailResponse,
  QuizOption,
  QuizQuestion,
  QuizResponse,
} from "@/lib/types/api";
import ProgressBar from "@/features/quiz/components/ProgressBar";
import Completed from "@/features/flashcards/components/test/Completed";

type LearnPageProps = {
  questionsProp?: QuizQuestion[];
};

type QuestionStatus = "correct" | "wrong";

export default function LearnPage({ questionsProp }: LearnPageProps) {
  const params = useParams();
  const quizId = params?.id as string;
  const language = useSearchParams()?.get("language") ?? "en";

  const [questions, setQuestions] = useState<QuizQuestion[]>(
    questionsProp ?? []
  );
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<QuestionStatus | null>(
    null
  );
  const [feedbackCorrectIds, setFeedbackCorrectIds] = useState<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = questions[currentIndex];

  const startAttempt = useCallback(
    async (
      quiz: string
    ): Promise<{
      attemptId: string;
      questions: QuizQuestion[];
      statuses: Record<string, QuestionStatus>;
    } | null> => {
      try {
        const response = await fetch(`/api/attempts/${quiz}`, {
          method: "PATCH",
          cache: "no-store",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizId: quiz, language }),
        });

        console.log(response);

        if (!response.ok) return null;

        const data: AttemptDetailResponse = await response.json();

        if (!data.success) {
          setError(data.error.message);
          return null;
        }

        const statuses = data.data.attempt.answers.reduce((acc, answer) => {
          if (answer.isCorrect === true) acc[answer.questionId] = "correct";
          else if (answer.isCorrect === false) acc[answer.questionId] = "wrong";
          return acc;
        }, {} as Record<string, QuestionStatus>);

        return {
          attemptId: data.data.attempt.id,
          questions: data.data.localization.questions,
          statuses,
        };
      } catch (error) {
        console.log(error);
        setError("Failed to start attempt");
        return null;
      }
    },
    [language]
  );

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
        const quizRes = await fetch(
          `/api/quizz/${quizId}?language=${language}`,
          { cache: "no-store", credentials: "include" }
        );
        const quizData: QuizResponse = await quizRes.json();
        const fallbackQuestions =
          quizData.success && quizData.data.localizations.length > 0
            ? quizData.data.localizations[0].questions
            : [];

        const attemptResult = await startAttempt(quizId);

        if (cancelled) return;

        const resolvedQuestions =
          attemptResult?.questions?.length && attemptResult.questions.length > 0
            ? attemptResult.questions
            : fallbackQuestions;

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
      } catch {
        if (!cancelled) {
          setError("Failed to load quiz");
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
  }, [language, quizId, startAttempt]);

  const resetFeedback = useCallback(() => {
    setSelectedOptionId(null);
    setFeedbackStatus(null);
    setFeedbackCorrectIds([]);
    setIsSubmitting(false);
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

  const handleAnswer = async (optionId: string) => {
    if (!currentQuestion || isSubmitting) return;
    if (!quizId) {
      setError("Quiz id missing");
      return;
    }

    let activeAttemptId = attemptId;
    if (!attemptId) {
      const attemptResult = await startAttempt(quizId);
      if (!attemptResult) return;
      activeAttemptId = attemptResult.attemptId;
      setAttemptId(attemptResult.attemptId);
      setQuestions(attemptResult.questions);
    }

    setSelectedOptionId(optionId);
    setIsSubmitting(true);
    const currentCorrectIds = currentQuestion.options
      .filter((opt) => opt.isCorrect)
      .map((opt) => opt.id);
    setFeedbackCorrectIds(currentCorrectIds);

    try {
      const response = await fetch(`/api/attempts/${activeAttemptId}/answers`, {
        method: "POST",
        cache: "no-store",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          selectedOptionIds: [optionId],
        }),
      });

      const parsed: AttemptDetailResponse = await response.json();

      if (!parsed.success) {
        setError(parsed.error.message);
        setIsSubmitting(false);
        return;
      }

      setAttemptId(parsed.data.attempt.id);
      const updatedQuestions = parsed.data.localization.questions;
      setQuestions(updatedQuestions);

      const updatedAnswer = parsed.data.attempt.answers.find(
        (answer) => answer.questionId === currentQuestion.id
      );
      const isCorrect = updatedAnswer?.isCorrect ?? false;

      setFeedbackStatus(isCorrect ? "correct" : "wrong");

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        goToNextQuestion(currentIndex + 1);
        resetFeedback();
      }, 1000);
    } catch {
      setError("Failed to submit answer");
      setIsSubmitting(false);
    }
  };

  const optionState = useCallback(
    (option: QuizOption) => {
      if (feedbackStatus === "correct" && selectedOptionId === option.id)
        return "correct";
      if (feedbackStatus === "wrong") {
        if (selectedOptionId === option.id) return "wrong";
        if (feedbackCorrectIds.includes(option.id)) return "correct";
      }
      if (selectedOptionId === option.id) return "selected";
      return "idle";
    },
    [feedbackCorrectIds, feedbackStatus, selectedOptionId]
  );

  return (
    <main className="flex w-full mx-auto min-h-screen bg-(--background) text-(--textColor)">
      {isCompleted ? (
        <Completed
          attemptId={attemptId}
          quizId={quizId}
          totalQuestions={questions.length}
          onRestart={() => {
            // setIsCompleted(false);
            // setCurrentIndex(0);
            // resetFeedback();
          }}
          onBack={() => {
            // setIsCompleted(false);
            // setCurrentIndex(questions.length);
            // resetFeedback();
          }}
        />
      ) : (
        <section className="flex flex-1 flex-col max-w-7xl items-center mx-auto px-4 pb-10 pt-6 lg:px-14">
          <div className="mt-8 flex w-full flex-col gap-6">
            <>
              <ProgressBar
                totalQuestions={questions.length}
                currentQuestion={currentIndex}
              />

              <div className="flex flex-col rounded-xl bg-(--capsule) px-8 py-5 gap-5 min-h-[60vh]">
                {isLoading ? (
                  <p className="text-sm text-(--grayText)">
                    Loading questions...
                  </p>
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
                      <p className="text-sm text-(--grayText)">
                        Choose an answer
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        {currentQuestion.options.map((option, idx) => {
                          const state = optionState(option);
                          const isDisabled = isSubmitting || !!feedbackStatus;
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleAnswer(option.id)}
                              disabled={isDisabled}
                              className={`flex rounded-lg border-2 px-4 py-3 gap-5 items-center text-left transition ${
                                state === "correct"
                                  ? "border-emerald-400 bg-emerald-400/10 text-white"
                                  : state === "wrong"
                                  ? "border-rose-500 bg-rose-500/10 text-white"
                                  : state === "selected"
                                  ? "border-(--primary) bg-(--primary)/10 text-white"
                                  : "border-(--grayText)/15 bg-transparent text-(--forground) hover:border-(--forground)/40"
                              } ${
                                isDisabled
                                  ? "cursor-not-allowed opacity-90"
                                  : ""
                              }`}
                            >
                              <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm">
                                {feedbackStatus &&
                                feedbackCorrectIds.includes(option.id) ? (
                                  <CheckIcon className="h-4 w-4 text-green-400" />
                                ) : feedbackStatus === "wrong" &&
                                  selectedOptionId === option.id ? (
                                  <XMarkIcon className="h-4 w-4 text-red-500" />
                                ) : (
                                  (idx + 1).toString()
                                )}
                              </span>
                              <p className="text-[15px] font-light">
                                {option.optionText}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-4 text-sm text-(--grayText)">
                      <button className="inline-flex items-center gap-2 rounded-full border border-(--forground)/15 px-4 py-2 text-(--grayText)">
                        <SpeakerWaveIcon className="h-5 w-5" />
                        Listen
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-full border border-(--forground)/15 px-4 py-2 text-(--grayText)">
                        <FlagIcon className="h-5 w-5" />
                        Report
                      </button>
                      <button
                        className="text-(--primary)"
                        onClick={() => {
                          if (timeoutRef.current)
                            clearTimeout(timeoutRef.current);
                          goToNextQuestion();
                          resetFeedback();
                        }}
                      >
                        Don&apos;t know?
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-(--grayText)">
                    No questions available for this quiz.
                  </p>
                )}
              </div>
            </>
          </div>
        </section>
      )}
    </main>
  );
}
