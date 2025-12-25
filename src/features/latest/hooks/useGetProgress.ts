import { ProgressBarProps } from "../types";

export function useGetProgress({
  currentQuestion,
  totalQuestions,
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

  return {
    totalSegments,
    currentGradient,
    segmentGradients,
    progressPercentage,
  };
}
