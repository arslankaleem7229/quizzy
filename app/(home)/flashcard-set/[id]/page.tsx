import { SpeakerWaveIcon, StarIcon } from "@heroicons/react/16/solid";
import FlashcardTestPage from "../../flashcard-test/page";
import FlashcardTestHeader from "./../components/FlashcardTestHeader";
import BreadCrumbs from "./../components/BreadCrumbs";
import UserAvatarIcon from "./../components/UserAvatarIcon";
import FlashCardSetsSection from "../../search/components/FlashCardSetsSection";
import { QuizDetail } from "@/lib/types/prisma";
import { cookies } from "next/headers";

type Term = {
  id: string;
  question: string;
  answer: string;
};

const studyModes = [
  { id: "flashcards", label: "Flashcards" },
  { id: "learn", label: "Learn" },
  { id: "test", label: "Test" },
  { id: "blocks", label: "Blocks" },
  { id: "blast", label: "Blast" },
  { id: "match", label: "Match" },
];

export default async function FlashcardSetPage(context: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await context.params;
  const res = await fetch(process.env.APP_URL + `/api/quizz/${id}`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  if (!res.ok) throw new Error(`Failed to load quizzes ${res.body}`);

  const quizz: QuizDetail = await res.json();

  return (
    <main className="flex w-full min-h-screen px-10 bg-(--background) text-(--textColor) pb-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 md:px-4 pt-4 lg:px-0">
        <BreadCrumbs />
        <FlashcardTestHeader quizzSet={quizz} />

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          {studyModes.map((mode) => (
            <button
              key={mode.id}
              className="rounded-lg bg-(--cardColor) p-5 font-medium tracking-wide transition hover:border-b-2 border-(--primary)"
            >
              {mode.label}
            </button>
          ))}
        </div>

        <FlashcardTestPage flashcards={quizz.sets[0].questions} classname="" />

        <UserAvatarIcon
          user={quizz.createdBy}
          createdAt={quizz.createdAt}
          classname="hidden lg:flex"
        />

        <FlashCardSetsSection header="Student also studied" />

        <RemainingSection
          header="Terms in this set"
          terms={quizz.sets[0].questions}
        />
      </div>
    </main>
  );
}

const RemainingSection = ({
  header,
  terms,
}: {
  header: string;
  terms: Term[];
}) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-medium">
          {header} ({terms.length})
        </h2>

        <button className="inline-flex items-center gap-2 rounded-full bg-(--capsule) px-4 py-2 text-sm">
          <StarIcon className="h-5 w-5 text-emerald-300" />
          Select these {terms.length}
        </button>
      </div>
      <div className="space-y-4">
        {terms.map((term) => (
          <article
            key={term.id}
            className="flex flex-row w-full items-center justify-between gap-4 rounded-lg px-5 py-4 bg-(--cardColor)"
          >
            <div className="flex flex-col w-full md:flex-row pr-4 md:pr-0 ">
              <p className="flex-1 px-2 font-bold md:font-light">
                {term.answer}
              </p>
              <div className="md:border-(--background) md:border md:py-0 py-2" />
              <p className="flex-2 px-5 font-extralight md:font-light">
                {term.question}
              </p>
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
        ))}
      </div>
    </section>
  );
};
