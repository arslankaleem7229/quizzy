import React from "react";
import { textbooks } from "../data/temp_data";
import { PopularTextbooksProps } from "../types";
import { TextbookCard } from "./TextbookCard";

export function PopularTextbooks({
  classname = "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-(--textColor)",
}: PopularTextbooksProps) {
  return (
    <div className="pb-16">
      <div className="text-sm font-semibold text-(--textColor)/80">
        Popular textbooks
      </div>

      <div className={classname}>
        {textbooks.map((book) => (
          <TextbookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}
