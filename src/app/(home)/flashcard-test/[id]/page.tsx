// TODO: cleanup the stuff after finishing backend. Many components named `Flashcard` making it difficult for dev and making bad routing names

"use client";

import {
  useFlashcardTest,
  Completed,
  TestFlashcard,
  FlashcardNavButton,
} from "@/features/test";
import { FlashcardTestPageProps } from "@/features/test/types";
import { useParams, useSearchParams } from "next/navigation";

export default function FlashcardTestPage() {
  const paramsId = useParams()?.id;
  const quizId = Array.isArray(paramsId) ? paramsId[0] : paramsId;
  const language = useSearchParams()?.get("language") ?? "en";

  return <FlashcardTestComponent quizId={quizId ?? ""} language={language} />;
}

export function FlashcardTestComponent({
  classname,
  questionsProp,
  quizId,
  language,
}: FlashcardTestPageProps) {
  const {
    currentCard,
    currentIndex,
    isFlipped,
    setIsFlipped,
    isCompleted,
    isLoading,
    error,
    totalQuestions,
    goToNext,
    goToPrevious,
    restart,
    exitCompletion,
  } = useFlashcardTest({
    quizId,
    language,
    initialQuestions: questionsProp,
  });
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
              totalQuestions={totalQuestions}
              quizId={quizId}
              onRestart={() => {
                restart();
              }}
              onBack={() => {
                exitCompletion();
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
                  <FlashcardNavButton
                    isLeft={true}
                    handleAction={goToPrevious}
                  />
                  <h1 className="text-sm font-medium">
                    {currentIndex + 1 + " / " + totalQuestions}
                  </h1>
                  <FlashcardNavButton isLeft={false} handleAction={goToNext} />
                </div>
              </>
            )
          )}
        </div>
      </section>
    </main>
  );
}
