import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FlashcardNavButtonProps } from "../types";

export function FlashcardNavButton({
  isLeft,
  handleAction,
}: FlashcardNavButtonProps) {
  return (
    <button
      onClick={handleAction}
      className="flex h-12 w-20 items-center justify-center rounded-full bg-(--cardColor) text-white transition hover:bg-[#323a6c]"
    >
      {isLeft ? (
        <FaArrowLeft className="h-5 w-10" />
      ) : (
        <FaArrowRight className="h-5 w-10" />
      )}
    </button>
  );
}
