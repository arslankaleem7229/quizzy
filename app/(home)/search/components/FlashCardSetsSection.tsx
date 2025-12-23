import Image from "next/image";
import Link from "next/link";
import { SearchQuizResult } from "@/lib/types/api";

type FlashCardSetsSectionProps = {
  header?: string;
  results?: SearchQuizResult[];
  isSearching?: boolean;
};

const FlashCardSetsSection = ({
  header,
  results,
  isSearching = false,
}: FlashCardSetsSectionProps) => {
  const hasResults = (results?.length ?? 0) > 0;
  const data = hasResults ? results! : [];
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
          {data.map((item) => {
            const title = item?.quiz.slug?.slugify();
            const terms = item.quiz.totalQuestions;
            const author =
              item.quiz.createdBy.name ?? item.quiz.createdBy.username ?? "—";
            const url = item.quiz.createdBy.image;
            const role = item.quiz.createdBy?.role ?? "";
            const href = `/flashcard-set/${item.quiz.id}`;

            return (
              <Link
                key={item.quiz.id}
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
