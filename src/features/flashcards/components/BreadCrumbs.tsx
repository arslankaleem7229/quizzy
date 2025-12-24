import Link from "next/link";
import { FlashCardSetsHeaderButtonRow } from "./FlashcardSetsHeader";

const breadcrumbs = [
  "Science",
  "Computer Science",
  "Computer Security and Reliability",
];

export function BreadCrumbs() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-wrap gap-2 text-sm text-(--grayText)">
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb} className="items-center">
            <Link href="#" className="hover:text-(--text-color)">
              {crumb}
            </Link>
            {idx < breadcrumbs.length - 1 && <span> / </span>}
          </div>
        ))}
      </div>

      <FlashCardSetsHeaderButtonRow classname="hidden lg:flex lg:justify-end" />
    </div>
  );
}
