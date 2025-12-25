import { QuizQuestion } from "@/lib/types";

export async function fetchQuiz(
  quizId: string,
  language: string
): Promise<QuizQuestion[]> {
  const response = await fetch(`/api/quizz/${quizId}?language=${language}`, {
    cache: "no-store",
    credentials: "include",
  });

  const quizz = await response.json();

  return quizz.success && quizz.data.localizations.length > 0
    ? quizz.data.localizations[0].questions
    : [];
}
