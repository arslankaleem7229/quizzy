"use client";

import Link from "next/link";
import useBuildHeader from "../hooks/useBuildHeader";
import { tabs } from "../data/tabs";

const SearchHeader = ({ query, total }: { query?: string; total?: number }) => {
  const { buildHref, activeTabLabel } = useBuildHeader(tabs);

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
