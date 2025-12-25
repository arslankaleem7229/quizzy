//   const [quizRes, recentRes] = await Promise.all([
//     fetch(process.env.APP_URL + "/api/quizz?limit=4", {
//       cache: "no-store",
//       credentials: "include",
//       headers: { cookie: cookieHeader },
//     }),
//     fetch(process.env.APP_URL + "/api/recent?limit=4", {
//       method: "GET",
//       cache: "no-store",
//       credentials: "include",
//       headers: { cookie: cookieHeader },
//     }),
//   ]);

import { RecentAttempt } from "@/lib/types";
import { RecentListResponse } from "@/types/api";
import { cookies } from "next/headers";

//   if (!quizRes.ok) throw new Error("Failed to load quizzes");

//   const quiz: QuizzesResponse = await quizRes.json();

//   let recents: RecentAttempt[] = [];

//   const quizzes = quiz.success ? quiz.data : [];

export async function getRecents(): Promise<RecentAttempt[]> {
  const cookieHeader = (await cookies()).toString();
  try {
    const response = await fetch(process.env.APP_URL + "/api/recent?limit=4", {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: { cookie: cookieHeader },
    });
    if (response.ok) {
      const recentJson: RecentListResponse = await response.json();
      if (recentJson.success) return recentJson.data ?? [];
    }
  } catch {}
  return [];
}
