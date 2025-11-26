// TODO: cleanup the stuff after finishing backend. Many components named `Flashcard` making it difficult for dev and making bad routing names
"use client";

import { useState } from "react";
import { Flashcard, TestFlashcard } from "./components/TestFlashcard";
import FlashcardNavButton from "./components/FlashcardNavButton";

const flashcards: Flashcard[] = [
  {
    id: 1,
    question:
      "Where can a customer go to get more detail about EC2 billing activity that took place 3 months ago?",
    answer:
      "Use the AWS Cost Explorer. It provides granular cost and usage data for up to 12 months and lets you drill into individual services such as EC2.",
    hint: "It lives inside the Billing & Cost Management console.",
  },
  {
    id: 2,
    question:
      "Which AWS support plan includes a designated Technical Account Manager?",
    answer:
      "The Enterprise Support plan provides a TAM who guides architectural decisions and operations.",
    hint: "Think of the highest non-custom public plan.",
  },
  {
    id: 3,
    question:
      "Which service should you use to deploy managed MySQL databases on AWS?",
    answer:
      "Amazon RDS (Relational Database Service) offers managed MySQL, PostgreSQL, Oracle, SQL Server, and MariaDB.",
    hint: "It's the go-to managed relational database service.",
  },
];

const FlashcardTestPage = () => {
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
    <main className="flex w-full min-h-screen">
      <section className="flex flex-1 flex-col">
        <div className="mt-8 flex flex-col items-center gap-8">
          <h1 className="font-medium text-xl tracking-widest">
            {currentIndex + 1 + " / " + flashcards.length}
          </h1>
          <TestFlashcard
            currentCard={flashcards[currentIndex]}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
          <div className="flex items-center gap-10">
            <FlashcardNavButton isLeft={true} handleAction={handlePrev} />
            <FlashcardNavButton isLeft={false} handleAction={handleNext} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default FlashcardTestPage;
