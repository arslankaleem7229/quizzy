import { SpeakerWaveIcon, StarIcon } from "@heroicons/react/16/solid";
import { FlashcardTestComponent } from "../../flashcard-test/[id]/page";
import { FlashcardSetsHeader } from "@/features/flashcards/components/FlashcardSetsHeader";
import { BreadCrumbs } from "@/features/flashcards/components/BreadCrumbs";
import { UserAvatarIcon } from "@/features/flashcards/components/UserAvatarIcon";
import FlashCardSetsSection from "@/features/search/components/FlashCardSetsSection";

import Image from "next/image";
import { QuizLocalization } from "@/lib/types";
import { fetchFlashcards } from "@/features/flashcards/services/fetchFlashcards";
import { ModesButton } from "@/features/flashcards";

export default async function FlashcardSetPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ language?: string }>;
}) {
  const language = (await searchParams).language ?? "en";
  const { id } = await params;

  const quiz = await fetchFlashcards({ id, language });

  return (
    <main className="flex w-full min-h-screen px-10 bg-(--background) text-(--textColor) pb-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 md:px-4 pt-4 lg:px-0">
        <BreadCrumbs />
        <FlashcardSetsHeader quiz={quiz} />

        <ModesButton id={id} />

        <FlashcardTestComponent
          questionsProp={quiz.localizations[0].questions}
          classname=""
          quizId=""
          language=""
        />

        <UserAvatarIcon
          user={quiz.createdBy}
          createdAt={quiz.createdAt}
          classname="hidden lg:flex"
        />

        <FlashCardSetsSection header="Student also studied" />

        <RemainingSection localization={quiz.localizations[0]} />
      </div>
    </main>
  );
}

const RemainingSection = ({
  localization,
}: {
  localization: QuizLocalization;
}) => {
  const questions = localization.questions;
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-medium">
          Terms in this set ({questions.length})
        </h2>

        <button className="inline-flex items-center gap-2 rounded-full bg-(--capsule) px-4 py-2 text-sm">
          <StarIcon className="h-5 w-5 text-emerald-300" />
          Select these {questions.length}
        </button>
      </div>
      <div className="space-y-4">
        {questions.map((question) => {
          const hasAttachements = question.attachments.length > 0;

          const questionImages = question.attachments.filter(
            (a) => a.questionId
          );
          const optionImages = question.attachments.filter((a) => a.optionId);

          return (
            <article
              key={question.id}
              className="flex flex-row w-full items-center justify-between gap-4 rounded-lg px-5 py-4 bg-(--cardColor)"
            >
              <div className="flex flex-col w-full md:flex-row pr-4 md:pr-0 ">
                {hasAttachements && optionImages.length > 0 ? (
                  <div className="flex-1 px-2 relative h-5 w-5">
                    <Image
                      src={optionImages[0].url}
                      alt="answer-image"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <p className="flex-1 px-2 font-bold md:font-light">
                    {question.options
                      .filter((o) => o.isCorrect)
                      .map((o) => o.optionText + "\n\n")}
                  </p>
                )}
                <div className="md:border-(--background) md:border md:py-0 py-2" />
                {hasAttachements && questionImages ? (
                  <div className="flex-2 px-5 relative h-35 w-35">
                    <Image
                      src={questionImages[0].url}
                      alt="answer-image"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <p className="flex-2 px-5 font-extralight md:font-light">
                    {question.questionText}
                  </p>
                )}
              </div>
              <div className="w-18 flex justify-end items-center gap-3">
                <button className="rounded-full border border-white/15 p-2">
                  <StarIcon className="h-5 w-5" />
                </button>
                <button className="rounded-full border border-white/15 p-2">
                  <SpeakerWaveIcon className="h-5 w-5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
