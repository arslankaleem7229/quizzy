import { QuizResponse } from "@/types/api";
import { FetchFlashcardsPayload } from "../types";
import { cookies } from "next/headers";

export async function fetchFlashcards({
  id,
  language,
}: FetchFlashcardsPayload) {
  const cookieHeader = (await cookies()).toString();
  const res = await fetch(
    process.env.APP_URL + `/api/quizz/${id}?language=${language}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        cookie: cookieHeader,
      },
    }
  );

  if (!res.ok) throw new Error(`Failed to load quizzes ${res.body}`);

  const response: QuizResponse = await res.json();

  if (!response.success) throw new Error(response?.error?.message);

  const quiz = response.data;
  const localization = quiz.localizations[0];

  if (localization) {
    try {
      const result = await fetch(process.env.APP_URL + "/api/attempts", {
        method: "POST",
        cache: "no-store",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,
        },
        body: JSON.stringify({ quizId: quiz.id, language: language }),
      });
    } catch (error) {
      console.error("Failed to log recent attempt", error);
    }
  }
  return quiz;
}
