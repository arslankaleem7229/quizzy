"use client";

import { HiOutlineSparkles } from "react-icons/hi2";
import { SmartAssistPanel } from "./SmartAssistPanel";

export interface SmartAssistContainerProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export function SmartAssistContainer({
  isOpen,
  onToggle,
}: SmartAssistContainerProps) {
  return (
    <div className="relative">
      <button
        type="button"
        className={`fixed bottom-6 right-6 inline-flex items-center gap-3 rounded-full bg-linear-to-br from-[#4ad5ff] to-[#a67bff] p-3 text-sm font-semibold shadow-lg shadow-[#000000]/50 transition-all duration-300 xl:hidden z-50 ${
          isOpen
            ? "opacity-0 scale-90 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
        onClick={() => onToggle(true)}
      >
        <HiOutlineSparkles className="h-8 w-8" />
      </button>

      {isOpen && (
        <div className="hidden xl:block fixed right-0 top-10 h-full w-[400px] z-40 pt-12 px-6 transition">
          <SmartAssistPanel onClose={() => onToggle(false)} />
        </div>
      )}

      <div
        className={`fixed inset-0 z-9999999 flex items-end justify-end bg-black/50 px-4 pb-6 pt-12 xl:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => onToggle(false)}
      >
        <div
          className={`fixed bottom-20 right-15 w-[400px] rounded-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          {isOpen && <SmartAssistPanel onClose={() => onToggle(false)} />}
        </div>
      </div>
    </div>
  );
}
