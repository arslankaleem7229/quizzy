import { memo } from "react";
import { FlagIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

export interface QuestionActionsProps {
  onSkip: () => void;
}

export const QuestionActions = memo(({ onSkip }: QuestionActionsProps) => {
  return (
    <div className="flex-1 flex flex-wrap items-center gap-4 text-sm text-(--grayText)">
      <button className="inline-flex items-center gap-2 rounded-full border border-(--foreground)/15 px-4 py-2 text-(--grayText)">
        <SpeakerWaveIcon className="h-5 w-5" />
        Listen
      </button>
      <button className="inline-flex items-center gap-2 rounded-full border border-(--foreground)/15 px-4 py-2 text-(--grayText)">
        <FlagIcon className="h-5 w-5" />
        Report
      </button>
      <button className="text-(--primary)" onClick={onSkip}>
        Don&apos;t know?
      </button>
    </div>
  );
});

QuestionActions.displayName = "QuestionActions";
