import Link from "next/link";
import { FlashCardTestHeaderButtonRow } from "./FlashcardTestHeader";

const breadcrumbs = [
  "Science",
  "Computer Science",
  "Computer Security and Reliability",
];

const BreadCrumbs = () => {
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

      <FlashCardTestHeaderButtonRow classname="hidden lg:flex lg:justify-end" />
    </div>
  );
};

export default BreadCrumbs;
