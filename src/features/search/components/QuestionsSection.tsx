import React from "react";
import { flashcardSets } from "../data/flashcardsdata";
import { MdVerified } from "react-icons/md";

const QuestionsSection = () => {
  return (
    <section className="space-y-5 text-(--textColor)">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="">Questions</h1>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-(--primary)">
          View all
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flashcardSets.slice(0, 2).map((set) => {
          return (
            <article
              key={set.id}
              className="flex h-full flex-col rounded-lg border-(--grayText)/10 border-2 bg-(--cardColor) p-3 transition hover:-translate-0.5"
            >
              <div className="flex flex-1 flex-col">
                <div>
                  <h3 className="text-xs font-medium">{set.title}</h3>
                </div>
                <div className="mt-2 text-xs max-h-[60px] overflow-hidden">
                  <span className="py-0.5 text-(--grayText) font-extralight ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                    nulla vel fugit mollitia aspernatur officia animi, nihil,
                    odit saepe vitae perspiciatis modi, consequatur repudiandae.
                    Accusantium atque officia architecto iusto excepturi? Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. At nulla
                    vel fugit mollitia aspernatur officia animi, nihil, odit
                    saepe vitae perspiciatis modi, consequatur repudiandae.
                    Accusantium atque officia architecto iusto excepturi?
                  </span>
                </div>
              </div>

              <div className="mt-3 flex">
                <div className=" flex  gap-1 justify-center items-center px-1 text-xs font-medium bg-white/10 rounded-full">
                  <MdVerified />
                  Verified answer
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default QuestionsSection;
