import Image from "next/image";
import StreakImage from "@/public/achivements/streak-flame.svg";

interface CurrentStreakDisplayProps {
  weekCount: number;
  daysInWeek: number;
}

export function CurrentStreakDisplay({
  weekCount,
  daysInWeek,
}: CurrentStreakDisplayProps) {
  return (
    <div className="flex min-w-20 max-w-150 flex-col gap-4 mb-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-center text-(--textColor)">
          Current streak
        </p>
        <p className="text-xs text-(--textColor) text-center">
          {weekCount}-week
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        {Array.from({ length: daysInWeek }).map((_, idx) => (
          <Image
            key={idx}
            src={StreakImage}
            alt="streak-Image"
            className={`h-8 w-8 ${
              idx !== 0
                ? "text-amber-400 drop-shadow-[0_5px_20px_rgba(255,193,7,0.35)]"
                : "text-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
