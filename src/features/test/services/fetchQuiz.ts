import { QuizResponse } from "@/types/api";
import { FetchQuizResult } from "../types";

export async function fetchSpecificQuiz(
  quizId: string,
  language: string
): Promise<FetchQuizResult> {
  const response = await fetch(`/api/quizz/${quizId}?language=${language}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) return { error: "Failed to load quiz" };

  const data: QuizResponse = await response.json();
  if (data.success) {
    const localization = data.data.localizations[0];
    return { questions: localization?.questions ?? [] };
  } else {
    return { error: data.error.message };
  }
}
