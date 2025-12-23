import { AttachmentType } from "@/app/generated/prisma";
import { QuizQuestion } from "@/lib/types/api";
import Image from "next/image";
import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";

export const TestFlashcard = ({
  currentCard,
  isFlipped,
  setIsFlipped,
}: {
  currentCard: QuizQuestion;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showHintButton, setShowHintButton] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const correctValues = currentCard.options
    .filter((o) => o.isCorrect)
    .map((o) => {
      return o.hasAttachment ? o.attachments[0].url : o.optionText + "\n\n";
    });

  const correctAttachments = currentCard.options
    .filter((o) => o.isCorrect && o.hasAttachment)
    .map((o) => o.attachments[0].url);

  const questionAttachments = currentCard.attachments
    .filter((a) => a.attachmentType === AttachmentType.QUESTION_IMAGE)
    .map((a) => {
      return a.url;
    });

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
