import { memo } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { OptionState } from "../types";
import { QuizOption } from "@/lib/types";

export interface QuestionOptionProps {
  option: QuizOption;
  index: number;
  state: OptionState;
  isDisabled: boolean;
  onClick: () => void;
  showFeedbackIcon: boolean;
  isCorrect: boolean;
}

export const QuestionOption = memo(
  ({
    option,
    index,
    state,
    isDisabled,
    onClick,
    showFeedbackIcon,
    isCorrect,
  }: QuestionOptionProps) => {
    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`flex rounded-lg border-2 px-4 py-3 gap-5 items-center text-left transition ${
          state === "correct"
            ? "border-emerald-400 bg-emerald-400/10 text-white"
            : state === "wrong"
            ? "border-rose-500 bg-rose-500/10 text-white"
            : state === "selected"
            ? "border-(--primary) bg-(--primary)/10 text-white"
            : "border-(--grayText)/15 bg-transparent text-(--forground) hover:border-(--forground)/40"
        } ${isDisabled ? "cursor-not-allowed opacity-90" : ""}`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm">
          {showFeedbackIcon && isCorrect ? (
            <CheckIcon className="h-4 w-4 text-green-400" />
          ) : showFeedbackIcon && !isCorrect ? (
            <XMarkIcon className="h-4 w-4 text-red-500" />
          ) : (
            (index + 1).toString()
          )}
        </span>
        <p className="text-[15px] font-light">{option.optionText}</p>
      </button>
    );
  }
);

QuestionOption.displayName = "QuestionOption";
