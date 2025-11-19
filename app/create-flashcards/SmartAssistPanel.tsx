"use client";

import { useState } from "react";
import { HiX } from "react-icons/hi";
import { LuCirclePlus } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";

type SmartAssistPanelProps = {
  onClose?: () => void;
};

const SmartAssistPanel = ({ onClose }: SmartAssistPanelProps) => {
  const [notes, setNotes] = useState("");

  return (
    <aside className="flex w-full h-full flex-col rounded-lg bg-[#2E3856] p-4 overflow-y-auto lg:h-auto lg:max-h-[calc(100vh-6rem)]">
      {/* header of ai assistant */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1 text-[15px] font-normal ">
            <span className="inline-flex h-8 w-8 items-center justify-center text-lg ">
              <HiOutlineSparkles className="h-5 w-5" />
            </span>
            <span className="font-medium bg-linear-to-br from-[#4ad5ff] to-[#a67bff] bg-clip-text text-transparent">
              Smart Assist
            </span>
            <span className="rounded-full bg-cyan-300/60 px-2 py-0.5 text-[10px] font-normal text-black">
              Beta
            </span>
          </div>
        </div>
        {onClose && (
          <button
            className="rounded-full text-xl text-white transition hover:bg-white/20 flex items-center justify-center h-8 w-8"
            onClick={onClose}
            aria-label="Close assistant"
          >
            <HiX className="h-5 w-5" />
          </button>
        )}
      </div>
      {/* text area  */}
      <div className="mt-5 rounded-lg bg-[#0c0f2f] p-3 focus-within:ring-2 focus-within:ring-white">
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          maxLength={100000}
          placeholder="Create flashcards by either uploading documents or pasting notes and providing a topic (e.g. photosynthesis)."
          className="h-120 w-full resize-none text-white placeholder:text-white/60
          outline-none"
        />
      </div>

      {/* text char counter */}
      <div
        className={`mt-2 text-right text-xs ${
          notes.length > 10 || notes.length === 0
            ? "text-white"
            : "text-red-500"
        }`}
      >
        {notes.length}/100,000
      </div>

      {/* buttons */}
      <div className="mt-3.5 flex items-center justify-between font-semibold">
        <button
          type="button"
          className={`
            text-sm p-2.5 font-normal
          ${notes.length > 10 ? "pointer-events-none opacity-50" : ""}
          inline-flex items-center gap-2 transition hover:text-white`}
        >
          <LuCirclePlus className="h-4 w-4" />
          Upload
        </button>
        <button
          className={`btn-primary
            ${notes.length < 10 && "opacity-50 bg-transparent "}
          `}
        >
          Start
        </button>
      </div>

      <p className="mt-2 text-[10px] tracking-wide leading-relaxed font-extralight text-center">
        This product is enhanced with AI and may provide incorrect or
        problematic content. Report content by using this{" "}
        <a href="#" className="font-bold">
          support form
        </a>
        .
      </p>
    </aside>
  );
};

export default SmartAssistPanel;
