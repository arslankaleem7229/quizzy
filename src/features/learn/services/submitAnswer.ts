import { AttemptDetailResponse } from "@/types/api";
import { SubmitAnswerParams, SubmitAnswerResult } from "../types";

export async function submitAnswer({
  attemptId,
  questionId,
  selectedOptionId,
}: SubmitAnswerParams): Promise<SubmitAnswerResult> {
  const response = await fetch(`/api/attempts/${attemptId}/answers`, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      questionId,
      selectedOptionIds: [selectedOptionId],
    }),
  });

  const parsed: AttemptDetailResponse = await response.json();

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const updatedAnswer = parsed.data.attempt.answers.find(
    (answer) => answer.questionId === questionId
  );

  return {
    attemptId: parsed.data.attempt.id,
    questions: parsed.data.localization.questions,
    isCorrect: updatedAnswer?.isCorrect ?? false,
  };
}
