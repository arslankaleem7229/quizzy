"use client";

import { useParams, useSearchParams } from "next/navigation";
import { LearnMode } from "@/features/learn";

export default function LearnPage() {
  const params = useParams();
  const quizId = params?.id as string;
  const language = useSearchParams()?.get("language") ?? "en";

  return (
    <main className="flex w-full mx-auto min-h-screen bg-(--background) text-(--textColor)">
      <LearnMode quizId={quizId} language={language} />
    </main>
  );
}
