"use client";
import Image from "next/image";
import { flashcards } from "@/app/data/flashcards";
import { useState, useRef } from "react";

const FlashCardsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, flashcards.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const getTransform = () => {
    const cardWidth = 320; // w-80 = 20rem = 320px
    const gap = 32; // space-x-8 = 2rem = 32px
    const translateX = -currentIndex * (cardWidth + gap);
    return `translateX(${translateX}px)`;
  };
  return (
    <div className="h-[calc(50%)] sm:h-[calc(55%)] w-full max-w-6xl lg:max-w-7xl items-center justify-center mx-auto">
      <div className="w-full h-full flex overflow-hidden justify-center items-center">
        <div
          className="flex h-[calc(95%)] space-x-8 py-6 px-8 transition-transform duration-500 ease-in-out"
          style={{ transform: getTransform() }}
        >
          {flashcards.map((flashcard, i) => {
            return (
              <div
                key={i}
                className={`relative shrink-0 w-60 h-75 md:w-80 md:h-full ${flashcard.color} rounded-xl overflow-hidden shadow p-4 transform transition ease-in-out duration-500 hover:scale-110`}
              >
                <h3
                  className={`font-bold text-xl text-center ${
                    flashcard.title === "Flashcards"
                      ? "text-white"
                      : "text-black"
                  } `}
                >
                  {flashcard.title}
                </h3>
                <Image
                  width={1000}
                  height={1000}
                  src={`${flashcard.image}`}
                  className="absolute flex h-[calc(90%)] w-full bottom-0 right-0"
                  alt={flashcard.title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashCardsComponent;
