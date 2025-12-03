import React from "react";
import { FaArrowRight } from "react-icons/fa";

const GenerateByAI = () => {
  return (
    <div className="px-1 md:px-3 flex flex-col items-end">
      <div className="flex w-full items-center gap-2 text-md font-base text-(--textColor)/80">
        Generate a
        <span className="tracking-wide btn-text py-0 px-0 text-base font-bold">
          flashcard set
        </span>
      </div>
      <div className="mt-3 w-full rounded-lg border-2 border-transparent bg-(--cardColor) px-3 py-2 transition focus-within:border-(--foreground)/40 relative">
        <textarea
          className="h-32 w-full resize-none text-base text-(--textColor) placeholder-(--foreground)/40 outline-none"
          placeholder="Paste your notes here. We'll do the rest."
        />
        <button className="absolute bottom-3 left-3 text-sm font-medium text-(--textColor)/70 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40">
          Upload a file
        </button>
        <button className="absolute bottom-3 right-3 bg-(--primary) hover:bg-(--primaryHover) rounded-full p-4">
          <FaArrowRight />
        </button>
      </div>

      <div className="mt-1 text-(--textColor)/40">0/100,000 characters</div>
    </div>
  );
};

export default GenerateByAI;
