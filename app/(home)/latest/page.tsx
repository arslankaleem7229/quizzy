import { cookies } from "next/headers";
import GenerateByAI from "./components/GenerateByAI";
import PopularFlashCards from "./components/PopularFlashCards";
import PopularTextbooks from "./components/PopularTextbooks";
import RecentComponent from "./components/RecentComponent";
import { QuizWithoutLocalization, QuizzesResponse } from "@/lib/types/api";

export default async function Latest() {
  const res = await fetch(process.env.APP_URL + "/api/quizz?limit=4", {
    cache: "no-store",
    credentials: "include",
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  if (!res.ok) throw new Error("Failed to load quizzes");

  const quiz: QuizzesResponse = await res.json();

  if (quiz.success)
    return (
      <main className="flex w-full min-h-screen bg-(--background) text-(--textColor)">
        <section className="flex flex-1 flex-col px-6 pb-5 lg:px-12">
          <div className="grid gap-8">
            <RecentComponent flashcards={quiz.data} />
            <GenerateByAI />
            <PopularFlashCards flashcards={quiz.data} />
            <PopularTextbooks />
          </div>
        </section>
      </main>
    );
}
