import React from "react";
import { textbooks } from "../temp_data";
import Image from "next/image";

const PopularTextbooks = ({
  classname = "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-(--textColor)",
}: {
  classname?: string;
}) => {
  return (
    <div className="pb-16">
      <div className="text-sm font-semibold text-(--textColor)/80">
        Popular textbooks
      </div>

      <div className={classname}>
        {textbooks.map((book) => (
          <div
            key={book.title}
            className="flex flex-col rounded-lg border border-(--grayText)/10 bg-(--cardColor) p-2 hover:bg-(--cardColorHover)"
          >
            <div className="flex flex-row items-start gap-3 h-30">
              <div className="relative h-full w-3/10 items-center justify-center rounded-xl bg-transparent text-xs font-semibold text-(--textColor)/80">
                <Image
                  src={"/books/physics.jpg"}
                  alt="book"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col h-full w-full items-start justify-between">
                <div className="text-base font-medium">{book.title}</div>
                <p className="text-xs text-(--textColor)/60">
                  {book.edition}
                  {"\n"}
                  {book.authors}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-(--capsule) px-3 py-1 text-xs text-(--textColor)/70">
                  <span>💡</span>
                  {book.solutions}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTextbooks;
