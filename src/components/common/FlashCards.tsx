"use client";
import Image from "next/image";
import { flashcards } from "@/features/flashcards/data/flashcards";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FlashCardsComponent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 320 : 240;
      const gap = window.innerWidth >= 640 ? 32 : 24;
      const scrollAmount =
        direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-6xl lg:max-w-7xl mx-auto relative">
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 
             bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition
             items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      {/* <div className="w-full flex overflow-hidden justify-center items-center"> */}
      <div
        ref={scrollRef}
        className="flex min-h-72 md:min-h-88 py-6 px-4 md:px-8 overflow-x-auto snap-x snap-mandatory scroll-smooth md:overflow-hidden md:snap-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {flashcards.map((flashcard, i) => {
          return (
            <Link key={i} href="/latest" className="shrink-0">
              <div
                className={`relative w-60 md:w-80 h-72 md:h-96 ${flashcard.color} mx-3 sm:mx-4 rounded-xl overflow-hidden shadow p-4 transform transition ease-in-out duration-500 hover:scale-105`}
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
      {/* </div> */}

      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 
             bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition
             items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FlashCardsComponent;
