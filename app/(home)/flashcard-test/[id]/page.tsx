// TODO: cleanup the stuff after finishing backend. Many components named `Flashcard` making it difficult for dev and making bad routing names

"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { TestFlashcard } from "../components/TestFlashcard";
import FlashcardNavButton from "../components/FlashcardNavButton";
import { QuizQuestion, QuizResponse } from "@/lib/types/api";
import Completed from "../components/Completed";

type FlashcardTestPageProps = {
  classname?: string;
  questionsProp?: QuizQuestion[];
};

export default function FlashcardTestPage({
  classname,
  questionsProp,
}: FlashcardTestPageProps) {
  const quizId = useParams()?.id;
  const language = useSearchParams()?.get("language") ?? "en";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    questionsProp ?? []
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(!questionsProp?.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (questionsProp?.length) {
      setQuestions(questionsProp);
      setIsLoading(false);
    }
  }, [questionsProp]);

  useEffect(() => {
    if (questions.length) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [questions.length]);

  useEffect(() => {
    if (questionsProp?.length) return;

    if (!quizId) return;

    const fetchQuiz = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/quizz/${quizId}?language=${language}`,
          { cache: "no-store", credentials: "include" }
        );

        if (!response.ok) {
          setError("Failed to load quiz");
          return;
        }

        const data: QuizResponse = await response.json();
        if (data.success) {
          const localization = data.data.localizations[0];

          setQuestions(localization?.questions ?? []);
        } else {
          setError(data.error.message);
        }
      } catch (err) {
        setError("Failed to load quiz");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [language, questionsProp, quizId]);

  const hasQuestions = questions.length > 0;
  const currentCard = hasQuestions ? questions[currentIndex] : null;

  const handleNext = () => {
    if (!hasQuestions) return;
    setIsFlipped(false);
    if (currentIndex === questions.length - 1) {
      setIsCompleted(true);
    } else {
      setCurrentIndex((next) => (next + 1) % questions.length);
    }
  };

  const handlePrev = () => {
    if (!hasQuestions) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
  };

  return (
    <main
      className={
        classname ??
        "flex w-full min-h-screen px-5 bg-(--background) text-(--textColor)"
      }
    >
      <section className="flex flex-1 flex-col">
        <div className="mt-8 flex flex-col items-center gap-8">
          {isLoading && (
            <p className="text-sm text-(--grayText)">Loading flashcards...</p>
          )}
          {error && !isLoading && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          {isCompleted ? (
            <Completed
              totalQuestions={questions.length}
              quizId={quizId as string}
              onRestart={() => {
                setIsCompleted(false);
                setCurrentIndex(0);
              }}
              onBack={() => {
                setIsCompleted(false);
              }}
            />
          ) : (
            currentCard && (
              <>
                <TestFlashcard
                  key={currentCard.id}
                  currentCard={currentCard}
                  isFlipped={isFlipped}
                  setIsFlipped={setIsFlipped}
                />
                <div className="flex items-center gap-10">
                  <FlashcardNavButton isLeft={true} handleAction={handlePrev} />
                  <h1 className="text-sm font-medium">
                    {currentIndex + 1 + " / " + questions.length}
                  </h1>
                  <FlashcardNavButton
                    isLeft={false}
                    handleAction={handleNext}
                  />
                </div>
              </>
            )
          )}
        </div>
      </section>
    </main>
  );
}
