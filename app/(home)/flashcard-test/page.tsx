// TODO: cleanup the stuff after finishing backend. Many components named `Flashcard` making it difficult for dev and making bad routing names
"use client";

// TODO: User progress is still incomplete

import { useState } from "react";
import { TestFlashcard } from "./components/TestFlashcard";
import FlashcardNavButton from "./components/FlashcardNavButton";
import { QuizQuestion } from "@/lib/types/api";

const FlashcardTestPage = ({
  classname,
  questions,
}: {
  classname?: string;
  questions: QuizQuestion[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
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
          <TestFlashcard
            currentCard={questions[currentIndex]}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
          <div className="flex items-center gap-10">
            <FlashcardNavButton isLeft={true} handleAction={handlePrev} />
            <h1 className="text-sm font-medium">
              {currentIndex + 1 + " / " + questions.length}
            </h1>
            <FlashcardNavButton isLeft={false} handleAction={handleNext} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default FlashcardTestPage;
