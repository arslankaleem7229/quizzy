"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Tab = { label: string; filter?: string };

const tabs: Tab[] = [
  { label: "All results" },
  { label: "Flashcard sets", filter: "flashcards" },
  { label: "Practice tests", filter: "practicetests" },
  { label: "Study guides", filter: "studyguides" },
  { label: "Textbooks", filter: "expertsolutions" },
  { label: "Questions", filter: "questions" },
  { label: "Users", filter: "users" },
  { label: "Classes", filter: "classes" },
];

const normalizeFilter = (value: string) =>
  value.toLowerCase().replace(/[^a-z]/g, "");

const SearchHeader = ({ query, total }: { query?: string; total?: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const normalizedFilter = filterParam ? normalizeFilter(filterParam) : "";
  const activeTabLabel =
    tabs.find((tab) => {
      if (!normalizedFilter || normalizedFilter === "all") {
        return tab.label === "All results";
      }
      const tabKey = normalizeFilter(tab.filter ?? tab.label);
      return tabKey === normalizedFilter;
    })?.label ?? tabs[0].label;

  const buildHref = (tab: Tab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab.filter) {
      params.set("filter", tab.filter);
    } else {
      params.delete("filter");
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-lg text-(--grayText)">
          {query &&
            total &&
            (query ? (
              <>
                {total} results for
                <span className="font-semibold text-(--forground)">
                  &quot;{query}&quot;
                </span>
              </>
            ) : (
              "Search for flashcards, tests and more"
            ))}
        </p>
      </div>

      <div className="flex justify-between text-sm border-(--grayText) border-b-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={buildHref(tab)}
            className={`border-b-2 px-5 py-2 transition relative -bottom-0.5 ${
              tab.label === activeTabLabel
                ? "border-(--primary) text-(--primary)"
                : "border-transparent hover:text-(--primary) hover:border-current text-(--textColor)"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchHeader;
