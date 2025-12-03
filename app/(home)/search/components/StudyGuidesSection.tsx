import React from "react";
import { flashcardSets } from "../flashcardsdata";
import Image from "next/image";

const StudyGuidesSection = () => {
  return (
    <section className="-mt-16 space-y-5 text-(--textColor)">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="">Study guides</h1>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-(--primary)">
          View all
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flashcardSets.slice(0, 2).map((set, index) => {
          return (
            <article
              key={set.id}
              className="flex h-full min-h-[200px] flex-col rounded-lg border-(--grayText)/10 border-2 bg-(--cardColor) p-5 transition hover:-translate-0.5"
            >
              <div className="flex flex-1 flex-col">
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
                <div className="mt-2 text-xs">
                  <span className="rounded-full bg-linear-to-br from-[#98E3FF] to-[#F7D9FF] px-3 py-0.5 text-black">
                    Study guides
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-clip">
                  <Image
                    src={`/avatars/${index + (1 % 20)}.jpg`}
                    alt={set.author}
                    fill
                  />
                </div>
                <p className="text-sm text-(--grayText)">{set.author}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default StudyGuidesSection;
