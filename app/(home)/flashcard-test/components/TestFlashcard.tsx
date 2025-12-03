import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";

export type Flashcard = {
  id: number;
  question: string;
  answer: string;
  hint: string;
};

export const TestFlashcard = ({
  currentCard,
  isFlipped,
  setIsFlipped,
}: {
  currentCard: Flashcard;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showHintButton, setShowHintButton] = useState(true);

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
            <div className="absolute top-5 left-5 flex items-center justify-between text-sm gap-2">
              <FaLightbulb />
              Get a hint
            </div>
          )}

          {/* <p className="rounded-full border border-white/20 px-4 py-1 text-xs text-gray-200">
                      Hint: {currentCard.hint}
                    </p> */}
          {!isFlipped && (
            <div className="absolute inset-0 flex items-center justify-center px-6 backface-hidden text-3xl font-extralight">
              {currentCard.question}
            </div>
          )}
          {isFlipped && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-lg backface-hidden rotate-y-180">
              <p className="text-3xl font-light">{currentCard.answer}</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
