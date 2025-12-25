import { ToggleProps } from "../types";

export function Toggle({ isOn, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
        isOn ? "bg-[#5465ff]" : "bg-[#2e3856]"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white transition ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
