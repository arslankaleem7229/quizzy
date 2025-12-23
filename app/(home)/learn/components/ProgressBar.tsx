type ProgressBarProps = {
  totalQuestions: number;
  currentQuestion: number;
};

export default function ProgressBar({
  totalQuestions,
  currentQuestion,
}: ProgressBarProps) {
  const totalSegments = 6;
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  const segmentGradients = [
    "from-teal-400 to-teal-500",
    "from-blue-400 to-blue-500",
    "from-indigo-400 to-indigo-500",
    "from-purple-400 to-purple-500",
    "from-pink-400 to-pink-500",
    "from-rose-400 to-rose-500",
  ];

  const currentSegmentIndex = Math.min(
    Math.floor((progressPercentage / 100) * totalSegments),
    totalSegments - 1
  );
  const currentGradient = segmentGradients[currentSegmentIndex];

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
      {/* 
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-600"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentIndex(Math.min(totalQuestions - 1, currentIndex + 1))
          }
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-600"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
