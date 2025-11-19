"use client";

import { useState } from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import {
  HiOutlinePlus,
  HiOutlineLockClosed,
  HiOutlineCog6Tooth,
  HiOutlineTrash,
  HiOutlineSparkles,
  HiOutlineArrowsRightLeft,
} from "react-icons/hi2";
import SmartAssistPanel from "./SmartAssistPanel";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import SortableCard from "./SortableCard";

const cardTemplate = () => ({ id: Math.random().toString(36).slice(2, 10) });

type IconComponent = React.ComponentType<{ className?: string }>;

const ActionIcon = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: IconComponent;
  label: string;
  onClick?: () => void;
}) => (
  <button
    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E3856] text-white font-bold transition hover:bg-[#262f55] hover:text-white"
    aria-label={label}
    type="button"
    onClick={onClick}
  >
    <Icon className="h-6 w-6" />
  </button>
);

const CreateFlashcardsPage = () => {
  const [cards, setCards] = useState([cardTemplate(), cardTemplate()]);
  const [isSmartAssistOpen, setIsSmartAssistOpen] = useState(false);

  const addCard = () => setCards((prev) => [...prev, cardTemplate()]);
  const removeCard = (id: string) => {
    setCards((prev) =>
      prev.length > 1 ? prev.filter((card) => card.id !== id) : prev
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex((c) => c.id === active.id);
    const newIndex = cards.findIndex((c) => c.id === over.id);

    if (oldIndex < 0 || newIndex < 0) return;

    setCards((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  return (
    <main className="w-full min-h-screen">
      <div className="flex w-full">
        <div
          className={`flex-1 transition-all duration-300 ${
            isSmartAssistOpen ? "xl:mr-[360px]" : ""
          }`}
        >
          {/* top header */}
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-12 lg:py-12">
            <div className="flex gap-5 flex-row justify-between mb-8">
              <h1 className="text-xl content-center font-medium text-white lg:text-2xl">
                Create a new flashcard set
              </h1>
              <div className="sm:flex gap-3 shrink-0">
                <button
                  type="button"
                  className="sm:block hidden rounded-full bg-[#2E3856] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#555d82]"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="rounded-full btn-primary  px-6 py-3 text-sm font-medium text-white transition"
                >
                  Create and practice
                </button>
              </div>
            </div>
            {/* title and desc */}
            <div className="space-y-2">
              <input
                placeholder="Title"
                className="w-full rounded-lg border border-transparent bg-[#2E3856] p-4 text-base font-normal text-white placeholder:text-white focus:border-white focus:outline-none focus:ring-1 "
              />
              <textarea
                placeholder="Add a description..."
                rows={3}
                className="w-full rounded-lg border border-transparent bg-[#2E3856] p-4 text-base text-white placeholder:text-white focus:border-white focus:outline-none focus:ring-1 resize-none"
              />
            </div>
            {/* button list */}
            <div className="flex flex-col flex-wrap gap-4 py-5  md:flex-row ">
              <div className=" flex flex-wrap items-center gap-3 w-full md:w-auto lg:w-auto">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#2E3856] px-4 py-2 font-medium text-sm text-white hover:bg-[#262f55]">
                  <HiOutlinePlus className="h-4 w-4" />
                  Import
                </button>

                <button className="inline-flex items-center gap-2 rounded-full bg-[#2E3856] px-4 py-2 font-medium text-sm text-white hover:bg-[#262f55]">
                  <HiOutlinePlus className="h-4 w-4" />
                  Add diagram
                  <span className="inline-flex items-center rounded-full bg-[#ffcd1f] px-2 py-0.5 font-medium text-sm text-black ml-1">
                    <HiOutlineLockClosed className="h-3 w-3" />
                  </span>
                </button>

                <button
                  className={`items-center gap-2 rounded-full px-4 py-2 font-medium text-sm text-white transition ${
                    isSmartAssistOpen
                      ? "hidden"
                      : "hidden xl:inline-flex bg-[#2E3856] hover:bg-[#262f55]"
                  }`}
                  onClick={() => setIsSmartAssistOpen(!isSmartAssistOpen)}
                >
                  <HiOutlineSparkles className="h-4 w-4" />
                  Smart Assist
                </button>
              </div>

              <div className=" flex flex-wrap items-center gap-3 w-full justify-end lg:ml-auto lg:w-auto">
                <div className="flex items-center gap-3 rounded-full  px-4 py-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8c93c8]">
                    Suggestions
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <ActionIcon icon={HiOutlineCog6Tooth} label="Settings" />
                  <ActionIcon icon={HiOutlineArrowsRightLeft} label="Shuffle" />
                  <ActionIcon icon={HiOutlineTrash} label="Delete all" />
                </div>
              </div>
            </div>

            {/* quizz creation cards */}
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
                      removeCard={removeCard}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* add card button */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={addCard}
                className="rounded-full bg-[#2E3856] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#3a4173]"
              >
                Add a card
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* SmartAssist Toggle Button */}
          <button
            type="button"
            className={`fixed bottom-6 right-6 inline-flex items-center gap-3 rounded-full bg-linear-to-br from-[#4ad5ff] to-[#a67bff] p-3 text-sm font-semibold shadow-lg shadow-[#000000]/50 transition-all duration-300 xl:hidden z-50 ${
              isSmartAssistOpen
                ? "opacity-0 scale-90 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
            onClick={() => setIsSmartAssistOpen(true)}
          >
            <HiOutlineSparkles className="h-8 w-8" />
          </button>

          {/* AI assistant tab */}
          {isSmartAssistOpen && (
            <div className="hidden xl:block fixed right-0 top-10 h-full w-[400px] z-40 pt-12 px-6 transition">
              <SmartAssistPanel onClose={() => setIsSmartAssistOpen(false)} />
            </div>
          )}

          {/* ai assistant overlay button */}
          <div
            className={`fixed inset-0 z-9999999 flex items-end justify-end bg-black/50 px-4 pb-6 pt-12 xl:hidden transition-opacity duration-300 ${
              isSmartAssistOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsSmartAssistOpen(false)}
          >
            {/* ai assistant overlay */}
            <div
              className={`fixed bottom-20 right-15 w-[400px] rounded-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
                isSmartAssistOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              {isSmartAssistOpen && (
                <SmartAssistPanel onClose={() => setIsSmartAssistOpen(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
      {/*
      {!isSmartAssistOpen && (
        <button
          type="button"
          className="fixed bottom-6 right-6 inline-flex items-center gap-3 rounded-full bg-linear-to-br from-[#4ad5ff] to-[#a67bff] p-3 text-sm font-semibold shadow-lg shadow-[#000000]/50 transition lg:hidden z-50"
          onClick={() => setIsSmartAssistOpen(true)}
        >
          <HiOutlineSparkles className="h-8 w-8" />
        </button>
      )}

      {isSmartAssistOpen && (
        <div
          className="fixed inset-0 z-9999999 flex items-end justify-end bg-black/50 px-4 pb-6 pt-12 lg:hidden"
          onClick={() => setIsSmartAssistOpen(false)}
        >
          <div
            className="fixed bottom-20 right-15 w-[400px] rounded-lg max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <SmartAssistPanel onClose={() => setIsSmartAssistOpen(false)} />
          </div>
        </div>
      )}

      */}
    </main>
  );
};

export default CreateFlashcardsPage;
