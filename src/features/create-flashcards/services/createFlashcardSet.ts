import { QuizResponse } from "@/types/api";
import { CreateFlashcardPayload } from "../types";

export async function createFlashcardSet(
  payload: CreateFlashcardPayload
): Promise<string> {
  const res = await fetch("/api/quizz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Request failed");

  const result: QuizResponse = await res.json();

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data.id;
}
