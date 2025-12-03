import Image from "next/image";
import { flashcardSets } from "../flashcardsdata";

const FlashCardSetsSection = ({ header }: { header?: string }) => {
  return (
    <section className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1>{header ?? "Flashcard sets"}</h1>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-(--primary)">
          View all
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flashcardSets.map((set, index) => {
          return (
            <article
              key={set.id}
              className="flex h-full min-h-[200px] flex-col rounded-lg border-gray-700 border-2 bg-white/10 p-5 transition hover:-translate-0.5"
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
                    <span className="rounded-full bg-white/10 px-3 py-1 text-white">
                      {set.terms} terms
                    </span>
                    <span>&bull;</span>
                    <span>
                      {set.rating.toFixed(1)} ({set.reviews})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-clip">
                    <Image
                      src={`/avatars/${index + (1 % 20)}.jpg`}
                      alt={set.author}
                      fill
                    />
                  </div>
                  <p className="text-sm text-gray-200">{set.author}</p>
                  <div className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold text-indigo-100">
                    {set.authorRole}
                  </div>
                </div>
                <button className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
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
