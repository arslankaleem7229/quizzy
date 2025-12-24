import { memo } from "react";
import { ActionIconProps } from "../types";

export const ActionIcon = memo(
  ({ icon: Icon, label, onClick, disabled = false }: ActionIconProps) => (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-(--capsule) font-bold transition hover:bg-[#262f55] hover:text-white ${
        disabled ? "opacity-50 cursor-not-allowed hover:bg-(--capsule)" : ""
      }`}
      aria-label={label}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-6 w-6" />
    </button>
  )
);

ActionIcon.displayName = "ActionIcon";
