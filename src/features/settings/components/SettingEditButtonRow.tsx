import { ReactNode } from "react";

export default function SettingEditButtonRow({
  label,
  value,
  onAction,
  enableTopBorder = true,
  enableBottomBorder = true,
  children,
}: {
  label: string;
  value: string;
  onAction?: () => void;
  enableTopBorder?: boolean;
  enableBottomBorder?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-row gap-2 ${
        enableTopBorder && "border-t-2"
      } last:border-none ${
        enableBottomBorder && "border-b-2"
      } border-gray-700 pl-6 pr-10 py-6 items-center justify-between`}
    >
      <div className="flex  flex-col gap-2">
        <p className="font-medium">{label}</p>
        <p className="text-base font-light tracking-wide">{value}</p>
      </div>
      {children && (
        <button
          type="button"
          onClick={onAction}
          className="text-sm font-semibold text-[#8ea5ff] transition hover:text-(--foreground)"
        >
          {children}
        </button>
      )}
    </div>
  );
}
