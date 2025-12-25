import { GetAttemptResponse } from "@/types/api";
import { AttemptResult } from "../types";

export async function fetchAttempt(attemptId: string): Promise<AttemptResult> {
  const res = await fetch(`/api/attempts/${attemptId}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  const parsed: GetAttemptResponse = await res.json();

  if (!parsed.success) {
    throw new Error("Failed to fetch attempt");
  }

  return {
    maxScore: parsed.data.maxScore ?? 0,
    obtainedScore: parsed.data.score ?? 0,
  };
}
