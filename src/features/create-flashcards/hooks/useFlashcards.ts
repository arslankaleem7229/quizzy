"use client";
import { useState, useCallback } from "react";
import { FlashcardCard, FlashcardsReturn } from "../types";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const createCard = (): FlashcardCard => ({
  id: Math.random().toString(36).slice(2, 10),
  term: "",
  definition: "",
  hint: "",
  explanation: "",
});

export function useFlashcards(): FlashcardsReturn {
  const [cards, setCards] = useState<FlashcardCard[]>(() => [
    createCard(),
    createCard(),
  ]);

  const addCard = useCallback(() => {
    setCards((prev) => [...prev, createCard()]);
  }, []);

  const removeCard = useCallback((id: string) => {
    setCards((prev) =>
      prev.length > 1 ? prev.filter((card) => card.id !== id) : prev
    );
  }, []);

  const updateCard = useCallback(
    (id: string, updates: Partial<FlashcardCard>) => {
      setCards((prev) =>
        prev.map((card) => (card.id === id ? { ...card, ...updates } : card))
      );
    },
    []
  );

  const clearCards = useCallback(() => {
    setCards([createCard(), createCard()]);
  }, []);

  const shuffleCards = useCallback(() => {
    setCards((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = cards.findIndex((c) => c.id === active.id);
      const newIndex = cards.findIndex((c) => c.id === over.id);

      if (oldIndex < 0 || newIndex < 0) return;

      setCards((prev) => arrayMove(prev, oldIndex, newIndex));
    },
    [cards, setCards]
  );

  return {
    cards,
    addCard,
    removeCard,
    updateCard,
    clearCards,
    shuffleCards,
    setCards,
    handleDragEnd,
  };
}
