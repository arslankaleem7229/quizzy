"use client";
import Image from "next/image";
import { flashcards } from "@/features/flashcards/data/flashcards";
import Link from "next/link";

const FlashCardsComponent = () => {
  return (
    <div className="w-full max-w-6xl lg:max-w-7xl mx-auto flex justify-center">
      <div className="w-full flex overflow-hidden justify-center items-center">
        <div className="flex min-h-72 md:min-h-88 space-x-6 sm:space-x-8 py-6 px-4 md:px-8 transition-transform duration-500 ease-in-out">
          {flashcards.map((flashcard, i) => {
            return (
              <Link key={i} href="/latest">
                <div
                  className={`relative shrink-0 w-60 md:w-80 h-72 md:h-96 ${flashcard.color} rounded-xl overflow-hidden shadow p-4 transform transition ease-in-out duration-500 hover:scale-105`}
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
                    className="absolute flex h-[90%] w-full bottom-0 right-0"
                    alt={flashcard.title}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashCardsComponent;
