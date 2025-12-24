"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CreateFlashcardsReturns, UseCreateFlashcardsProps } from "../types";
import { validateCards } from "../utils/validateCards";
import { createSlug } from "../utils/createSlug";
import { createFlashcardSet } from "../services/createFlashcardSet";

const DEFAULT_LANGUAGE = "en";

export function useCreateFlashcards({
  cards,
  title,
  description,
  onError,
}: UseCreateFlashcardsProps): CreateFlashcardsReturns {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = useCallback(
    async (shouldPractice: boolean) => {
      if (isSubmitting) return;

      const validation = validateCards(cards, title);
      if (!validation.isValid) {
        const errorMessage =
          validation.message ?? "Check your flashcards and try again.";
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      const payload = {
        title: title.trim(),
        description: description.trim() || undefined,
        language: DEFAULT_LANGUAGE,
        slug: createSlug(title.trim()),
        isPublished: true,
        questions:
          validation.cards?.map((card) => ({
            term: card.term,
            definition: card.definition,
            questionType: "SINGLE_CHOICE" as const,
            ...(card.hint ? { hint: card.hint } : {}),
            ...(card.explanation ? { explanation: card.explanation } : {}),
          })) ?? [],
      };

      setIsSubmitting(true);
      setError(null);
      onError?.(null);

      try {
        const quizId = await createFlashcardSet(payload);

        const destination = shouldPractice
          ? `/flashcard-set/${quizId}#practice`
          : `/flashcard-set/${quizId}`;

        router.push(destination);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message || "Failed to create flashcard set"
            : "Failed to create flashcard set";
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [cards, title, description, isSubmitting, router, onError]
  );

  return {
    isSubmitting,
    error,
    handleCreate,
  };
}
