"use client";
import { useEffect, useState } from "react";
import { fetchAttempt } from "../services/fetchAttempt";
import { AttemptResult } from "../types";

export function useAttemptResult(
  attemptId?: string | null | undefined
): AttemptResult {
  const [maxScore, setMaxScore] = useState(0);
  const [obtainedScore, setObtainedScore] = useState(0);

  useEffect(() => {
    if (!attemptId) return;

    fetchAttempt(attemptId)
      .then(({ maxScore, obtainedScore }) => {
        setMaxScore(maxScore);
        setObtainedScore(obtainedScore);
      })
      .catch(console.error);
  }, [attemptId]);

  return { maxScore, obtainedScore };
}
