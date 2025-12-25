import { useGetProgress } from "../hooks/useGetProgress";

type ProgressBarProps = {
  totalQuestions: number;
  currentQuestion: number;
};

export default function ProgressBar({
  totalQuestions,
  currentQuestion,
}: ProgressBarProps) {
  const {
    totalSegments,
    currentGradient,
    segmentGradients,
    progressPercentage,
  } = useGetProgress({
    currentQuestion,
    totalQuestions,
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="relative flex flex-1 gap-2 items-center">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full bg-linear-to-r ${segmentGradients[index]} opacity-20`}
            />
          ))}
          <div
            className="absolute inset-0 flex gap-2"
            style={{
              clipPath: `inset(0 ${100 - progressPercentage}% 0 0)`,
            }}
          >
            {Array.from({ length: totalSegments }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full bg-linear-to-r ${segmentGradients[index]}`}
              />
            ))}
          </div>

          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              left: `calc(${progressPercentage}% - 20px)`,
            }}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-700 bg-linear-to-r ${currentGradient} text-white font-semibold shadow-lg`}
            >
              {currentQuestion + 1}
            </div>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-slate-700/50 px-3 py-1.5 text-xs text-slate-300">
          {totalQuestions}
        </span>
      </div>
    </div>
  );
}
