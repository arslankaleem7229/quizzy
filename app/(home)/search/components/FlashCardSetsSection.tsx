import Image from "next/image";
import { flashcardSets } from "../flashcardsdata";

const FlashCardSetsSection = ({ header }: { header?: string }) => {
  return (
    <section className="space-y-5 text-(--textColor)">
      <header className="flex items-center justify-between">
        <h1>{header ?? "Flashcard sets"}</h1>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-(--primary)">
          View all
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flashcardSets.map((set, index) => {
          return (
            <article
              key={set.id}
              className="flex h-full min-h-[200px] flex-col rounded-lg border-(--grayText)/10 border-2 bg-(--cardColor) p-5 transition hover:-translate-0.5"
            >
              <div className="flex flex-2 flex-col justify-evenly">
                <div className="hidden">
                  {set.studentsToday ? (
                    <span className="text-[0.7rem] text-emerald-300">
                      {set.studentsToday} studying today
                    </span>
                  ) : (
                    set.lastStudied && (
                      <span className="text-[0.7rem] text-sky-300">
                        {set.lastStudied}
                      </span>
                    )
                  )}
                </div>
                <div>
                  <h3 className="text-md font-medium">{set.title}</h3>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-(--capsule) px-3 py-1">
                      {set.terms} terms
                    </span>
                    <span>&bull;</span>
                    <span>
                      {set.rating.toFixed(1)} ({set.reviews})
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 flex-row flex-nowrap items-center gap-3">
                  <div className="shrink-0 relative h-10 w-10 rounded-full overflow-clip">
                    <Image
                      src={`/avatars/${index + (1 % 20)}.jpg`}
                      alt={set.author}
                      fill
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-(--grayText) overflow-clip line-clamp-1">
                      {set.author}
                    </p>
                    <div className="flex">
                      <div className="rounded-full bg-(--capsule) px-2 py-1 text-[10px] font-medium">
                        {set.authorRole}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className={`${
                    header && "flex xl:hidden"
                  } rounded-full border border-(--foreground)/20 px-4 py-2 text-xs font-semibold transition hover:border-(--foreground)/40 hover:bg-(--foreground)/5`}
                >
                  Preview
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FlashCardSetsSection;
