import { AttemptDetailResponse } from "@/types/api";
import { QuestionStatus, StartAttemptResult } from "../types";

export async function startAttempt(
  quizId: string,
  language: string
): Promise<StartAttemptResult | null> {
  try {
    const response = await fetch(`/api/attempts/${quizId}`, {
      method: "PATCH",
      cache: "no-store",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId, language }),
    });

    if (!response.ok) return null;

    const data: AttemptDetailResponse = await response.json();

    if (!data.success) {
      throw new Error(data.error.message);
    }

    const statuses = data.data.attempt.answers.reduce((acc, answer) => {
      if (answer.isCorrect === true) acc[answer.questionId] = "correct";
      else if (answer.isCorrect === false) acc[answer.questionId] = "wrong";
      return acc;
    }, {} as Record<string, QuestionStatus>);

    return {
      attemptId: data.data.attempt.id,
      questions: data.data.localization.questions,
      statuses,
    };
  } catch (error) {
    console.error("Failed to start attempt:", error);
    throw error;
  }
}
