// TODO: cleanup the stuff after finishing backend. Many components named `Flashcard` making it difficult for dev and making bad routing names
"use client";

import { useState } from "react";
import { TestFlashcard } from "./components/TestFlashcard";
import FlashcardNavButton from "./components/FlashcardNavButton";
import { QuizDetailQuestion } from "@/lib/types/prisma";

const FlashcardTestPage = ({
  classname,
  flashcards,
}: {
  classname?: string;
  flashcards: QuizDetailQuestion[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
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
          <TestFlashcard
            currentCard={flashcards[currentIndex]}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
          <div className="flex items-center gap-10">
            <FlashcardNavButton isLeft={true} handleAction={handlePrev} />
            <h1 className="text-sm font-medium">
              {currentIndex + 1 + " / " + flashcards.length}
            </h1>
            <FlashcardNavButton isLeft={false} handleAction={handleNext} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default FlashcardTestPage;
