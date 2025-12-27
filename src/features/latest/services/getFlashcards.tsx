import { QuizWithoutLocalization } from "@/lib/types";
import { QuizzesResponse } from "@/types/api";
import { cookies } from "next/headers";

export async function getFlashcards(): Promise<QuizWithoutLocalization[]> {
  const cookieHeader = (await cookies()).toString();
  try {
    const response = await fetch(process.env.APP_URL + "/api/quizz?limit=4", {
      cache: "no-store",
      credentials: "include",
      headers: { cookie: cookieHeader },
    });
    if (response.ok) {
      const quiz: QuizzesResponse = await response.json();
      if (quiz.success) return quiz.data ?? [];
    }
  } catch {}
  return [];
}
