import { cookies } from "next/headers";
import GenerateByAI from "./components/GenerateByAI";
import PopularFlashCards from "./components/PopularFlashCards";
import PopularTextbooks from "./components/PopularTextbooks";
import RecentComponent from "./components/RecentComponent";
import {
  QuizzesResponse,
  RecentListResponse,
  RecentAttempt,
} from "@/lib/types/api";

export default async function Latest() {
  const cookieHeader = (await cookies()).toString();

  const [quizRes, recentRes] = await Promise.all([
    fetch(process.env.APP_URL + "/api/quizz?limit=4", {
      cache: "no-store",
      credentials: "include",
      headers: { cookie: cookieHeader },
    }),
    fetch(process.env.APP_URL + "/api/recent?limit=4", {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: { cookie: cookieHeader },
    }),
  ]);

  if (!quizRes.ok) throw new Error("Failed to load quizzes");

  const quiz: QuizzesResponse = await quizRes.json();

  let recents: RecentAttempt[] = [];
  if (recentRes.ok) {
    const recentJson: RecentListResponse = await recentRes.json();
    if (recentJson.success) recents = recentJson.data ?? [];
  }

  if (quiz.success)
    return (
      <main className="flex w-full min-h-screen bg-(--background) text-(--textColor)">
        <section className="flex flex-1 flex-col px-6 pb-5 lg:px-12">
          <div className="grid gap-8">
            <RecentComponent recents={recents} />
            <GenerateByAI />
            <PopularFlashCards flashcards={quiz.data} />
            <PopularTextbooks />
          </div>
        </section>
      </main>
    );
}
