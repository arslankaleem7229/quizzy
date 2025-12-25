"use client";

import Image from "next/image";
import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";

import { TestFlashcardProps } from "../types";
import {
  getCorrectAttachments,
  getCorrectValues,
  getQuestionImages,
} from "../utils/flashcardSelectors";

export const TestFlashcard = ({
  currentCard,
  isFlipped,
  setIsFlipped,
}: TestFlashcardProps) => {
  const [showHintButton, setShowHintButton] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const correctValues = getCorrectValues(currentCard);
  const correctAttachments = getCorrectAttachments(currentCard);
  const questionAttachments = getQuestionImages(currentCard);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-5">
      <div className="w-full transition-transform duration-500">
        <button
          type="button"
          className={`
                  flex h-[520px] w-full mx-auto
                  rounded-xl bg-(--cardColor) 
                  text-xl font-medium 
                  transition-transform duration-500 transform-3d ${
                    isFlipped ? "rotate-y-180" : "rotate-y-0"
                  }
                  `}
          onClick={() => setIsFlipped((prev) => !prev)}
          onTransitionEnd={() => {
            setShowHintButton(() => !isFlipped);
          }}
        >
          {showHintButton && !isFlipped && (
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setShowHint(!showHint);
              }}
            >
              <div className="absolute top-5 left-5 flex items-center justify-between text-sm gap-2">
                {showHint ? (
                  <p className="rounded-full border border-white/20 px-4 py-1 text-xs text-gray-200">
                    Hint: {currentCard.hint}
                  </p>
                ) : (
                  <>
                    <FaLightbulb />
                    Get a hint
                  </>
                )}
              </div>
            </div>
          )}
          {!isFlipped && (
            <div className="absolute inset-0 overflow-scroll px-6 my-16 backface-hidden">
              <div className="min-h-full flex items-center justify-center text-3xl font-extralight wrap-break-word">
                {!questionAttachments.length ? (
                  currentCard.questionText
                ) : (
                  <Image
                    src={questionAttachments[0]}
                    alt={questionAttachments[0]}
                    fill
                  />
                )}
              </div>
            </div>
          )}
          {isFlipped && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-lg backface-hidden rotate-y-180">
              {!correctAttachments.length ? (
                <p className="text-3xl font-light">{correctValues}</p>
              ) : (
                <Image
                  src={correctAttachments[0]}
                  alt={correctAttachments[0]}
                  fill
                />
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
