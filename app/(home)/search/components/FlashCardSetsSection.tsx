import Image from "next/image";
import Link from "next/link";
import { SearchQuizResult } from "@/lib/types/api";
import { flashcardSets } from "../flashcardsdata";

type FlashCardSetsSectionProps = {
  header?: string;
  results?: SearchQuizResult[];
  isSearching?: boolean;
  query?: string;
};

const FlashCardSetsSection = ({
  header,
  results,
  isSearching = false,
  query = "",
}: FlashCardSetsSectionProps) => {
  const hasResults = (results?.length ?? 0) > 0;
  const shouldShowStatic = !query && !hasResults;
  const data = hasResults ? results! : shouldShowStatic ? flashcardSets : [];
  const hasData = data.length > 0;

  return (
    <section className="space-y-5 text-(--textColor)">
      <header className="flex items-center justify-between">
        <h1>{header ?? "Flashcard sets"}</h1>
        {hasData && (
          <button className="inline-flex items-center gap-2 text-sm font-medium text-(--primary)">
            View all
          </button>
        )}
      </header>

      {isSearching && !hasResults && (
        <div className="rounded-lg border border-(--foreground)/10 bg-(--cardColor) px-4 py-3 text-sm text-(--grayText)">
          Searching flashcard sets...
        </div>
      )}

      {!isSearching && !hasData && (
        <div className="rounded-lg border border-(--foreground)/10 bg-(--cardColor) px-4 py-3 text-sm text-(--grayText)">
          No sets found. Try another keyword.
        </div>
      )}

      {hasData && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item, index) => {
            const isStatic = !("quiz" in item);

            const title = isStatic
              ? item.title
              : item.title || item.quiz.slug?.slugify();
            const terms = isStatic
              ? item.terms
              : item.questionCount ?? item.quiz.totalQuestions;
            const author = isStatic
              ? item.author
              : item.quiz.createdBy.name ?? item.quiz.createdBy.username ?? "—";
            const url = isStatic
              ? `/avatars/${(index % 20) + 1}.jpg`
              : item.quiz.createdBy.image;
            const role = isStatic
              ? item.authorRole
              : item.quiz.createdBy?.role ?? "";
            const href = isStatic
              ? "#"
              : `/flashcard-set/${item.quiz.id}?language=${
                  item.language ?? "en"
                }`;

            return (
              <Link
                key={isStatic ? item.id : index}
                href={href}
                className="flex h-full min-h-[200px] flex-col rounded-lg border-(--grayText)/10 border-2 bg-(--cardColor) p-5 transition hover:-translate-0.5"
              >
                <div className="flex flex-2 flex-col justify-evenly">
                  <div>
                    <h3 className="text-md font-medium line-clamp-2">
                      {title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-(--capsule) px-3 py-1">
                        {terms} terms
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-1 flex-row flex-nowrap items-center gap-3">
                    <div className="shrink-0 relative h-10 w-10 rounded-full overflow-clip">
                      {url && <Image src={url} alt={author} fill />}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-(--grayText) overflow-clip line-clamp-1">
                        {author}
                      </p>
                      <div className="flex">
                        <div className="rounded-full bg-(--capsule) px-2 py-1 text-[10px] font-medium">
                          {role}
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
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FlashCardSetsSection;
