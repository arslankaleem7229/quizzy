"use client";

import { useState, useMemo, useCallback } from "react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  HiOutlinePlus,
  HiOutlineLockClosed,
  HiOutlineCog6Tooth,
  HiOutlineTrash,
  HiOutlineSparkles,
  HiOutlineArrowsRightLeft,
} from "react-icons/hi2";
import { useFlashcards } from "../hooks/useFlashcards";
import { useCreateFlashcards } from "../hooks/useCreateFlashcards";
import SortableCard from "./SortableCard";
import { ActionIcon } from "./ActionIcon";
import { SmartAssistContainer } from "./SmartAssistContainer";

export function CreateFlashcards() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSmartAssistOpen, setIsSmartAssistOpen] = useState(true);

  const {
    cards,
    addCard,
    removeCard,
    updateCard,
    clearCards,
    shuffleCards,
    handleDragEnd,
  } = useFlashcards();

  const { isSubmitting, handleCreate } = useCreateFlashcards({
    cards,
    title,
    description,
    onError: setError,
  });

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    setError(null);
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
    setError(null);
  }, []);

  const handleRemoveCard = useCallback(
    (id: string) => {
      setError(null);
      removeCard(id);
    },
    [removeCard]
  );

  const handleUpdateCard = useCallback(
    (id: string, updates: Parameters<typeof updateCard>[1]) => {
      setError(null);
      updateCard(id, updates);
    },
    [updateCard]
  );

  const handleClearCards = useCallback(() => {
    setError(null);
    clearCards();
  }, [clearCards]);

  const canSubmit = useMemo(() => {
    const trimmedTitle = title.trim();
    const normalizedCards = cards
      .map((card) => ({
        term: card.term.trim(),
        definition: card.definition.trim(),
      }))
      .filter((card) => card.term || card.definition);

    return (
      trimmedTitle.length > 0 &&
      normalizedCards.length > 0 &&
      normalizedCards.every((card) => card.term && card.definition) &&
      !isSubmitting
    );
  }, [title, cards, isSubmitting]);

  const disableActions = useMemo(
    () => isSubmitting || cards.length === 0,
    [isSubmitting, cards.length]
  );

  return (
    <main className="w-full min-h-screen bg-(--background) text-(--textColor)">
      <div className="flex w-full">
        <div
          className={`flex-1 transition-all duration-300 ${
            isSmartAssistOpen ? "xl:mr-90" : ""
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-12 lg:py-12">
            <div className="flex gap-5 flex-row justify-between mb-8">
              <h1 className="text-xl content-center font-medium lg:text-2xl">
                Create a new flashcard set
              </h1>
              <div className="sm:flex gap-3 shrink-0">
                <button
                  type="button"
                  className="sm:block hidden rounded-full bg-(--capsule) px-6 py-3 text-sm font-medium transition hover:bg-(--cardColorHover) disabled:opacity-60"
                  onClick={() => handleCreate(false)}
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
                <button
                  type="button"
                  className="rounded-full btn-primary px-6 py-3 text-sm font-medium text-white transition disabled:opacity-60"
                  onClick={() => handleCreate(true)}
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "Creating..." : "Create and practice"}
                </button>
              </div>
            </div>

            {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

            <div className="space-y-2">
              <input
                placeholder="Title"
                value={title}
                onChange={(event) => handleTitleChange(event.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-lg border bg-(--cardColor) p-4 text-base font-normal border-transparent focus:outline-none focus:ring-[#a8b1ff] focus:ring-2"
              />
              <textarea
                placeholder="Add a description..."
                rows={3}
                value={description}
                onChange={(event) =>
                  handleDescriptionChange(event.target.value)
                }
                disabled={isSubmitting}
                className="w-full rounded-lg border border-transparent bg-(--cardColor) p-4 text-base focus:outline-none focus:ring-[#a8b1ff] focus:ring-2 resize-none"
              />
            </div>

            <div className="flex flex-col flex-wrap gap-4 py-5 md:flex-row">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto lg:w-auto">
                <button className="inline-flex items-center gap-2 rounded-full bg-(--capsule) px-4 py-2 font-medium text-sm hover:bg-[#262f55]">
                  <HiOutlinePlus className="h-4 w-4" />
                  Import
                </button>

                <button className="inline-flex items-center gap-2 rounded-full bg-(--capsule) px-4 py-2 font-medium text-sm hover:bg-[#262f55]">
                  <HiOutlinePlus className="h-4 w-4" />
                  Add diagram
                  <span className="inline-flex items-center rounded-full bg-[#ffcd1f] px-2 py-0.5 font-medium text-sm text-black ml-1">
                    <HiOutlineLockClosed className="h-3 w-3" />
                  </span>
                </button>

                <button
                  className={`items-center gap-2 rounded-full px-4 py-2 font-medium text-sm transition ${
                    isSmartAssistOpen
                      ? "hidden"
                      : "hidden xl:inline-flex bg-(--capsule) hover:bg-[#262f55]"
                  }`}
                  onClick={() => setIsSmartAssistOpen(!isSmartAssistOpen)}
                >
                  <HiOutlineSparkles className="h-4 w-4" />
                  Smart Assist
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full justify-end lg:ml-auto lg:w-auto">
                <div className="flex items-center gap-3 rounded-full px-4 py-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8c93c8]">
                    Suggestions
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <ActionIcon icon={HiOutlineCog6Tooth} label="Settings" />
                  <ActionIcon
                    icon={HiOutlineArrowsRightLeft}
                    label="Shuffle"
                    onClick={shuffleCards}
                    disabled={disableActions || cards.length < 2}
                  />
                  <ActionIcon
                    icon={HiOutlineTrash}
                    label="Delete all"
                    onClick={handleClearCards}
                    disabled={disableActions}
                  />
                </div>
              </div>
            </div>

            <DndContext
              onDragEnd={handleDragEnd}
              modifiers={[restrictToParentElement]}
            >
              <SortableContext items={cards.map((c) => c.id)}>
                <div className="space-y-4 mb-8">
                  {cards.map((card, index) => (
                    <SortableCard
                      key={card.id}
                      card={card}
                      index={index}
                      removeCard={handleRemoveCard}
                      onChange={handleUpdateCard}
                      disabled={isSubmitting}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={addCard}
                disabled={isSubmitting}
                className="rounded-full bg-(--capsule) px-8 py-3 text-base font-semibold transition hover:bg-[#3a4173] disabled:opacity-60"
              >
                Add a card
              </button>
            </div>
          </div>
        </div>

        <SmartAssistContainer
          isOpen={isSmartAssistOpen}
          onToggle={setIsSmartAssistOpen}
        />
      </div>
    </main>
  );
}
