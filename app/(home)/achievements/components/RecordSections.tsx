"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AchievementHeader } from "../data";

type Props = {
  component: AchievementHeader;
};

const RecordSections = ({ component }: Props) => {
  const [viewAll, setViewAll] = useState(false);

  const [itemsToShow, setItemsToShow] = useState(6);

  useEffect(() => {
    const updateItemCount = () => {
      const width = window.innerWidth;
      if (width >= 1536) setItemsToShow(6);
      else if (width >= 1280) setItemsToShow(6);
      else if (width >= 1094) setItemsToShow(5);
      else if (width >= 925) setItemsToShow(4);
      else if (width >= 645) setItemsToShow(3);
      else setItemsToShow(2);
    };

    // 645 -> 3
    // 925 -> 4
    // 1093 -> 5
    // 1280 -> 6

    updateItemCount();
    window.addEventListener("resize", updateItemCount);
    return () => window.removeEventListener("resize", updateItemCount);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-xl font-light">{component.title}</h1>
      <div className="flex flex-row flex-wrap pb-8 gap-x-8 gap-y-12 md:justify-start justify-center">
        {component.items
          .slice(0, viewAll ? component.items.length : itemsToShow)
          .map((item) => {
            return (
              <div key={item.id} className="w-38">
                <div className="items-center flex flex-col flex-nowrap text-center w-full">
                  <div className="relative flex items-center justify-center w-full h-38">
                    <Image
                      src={
                        item.locked
                          ? item.icon
                          : item.icon.replaceAll("locked-", "")
                      }
                      alt={item.title}
                      fill
                      className={`object-contain h-12 w-12 items-center justify-center rounded-full text-sm font-semibold uppercase transition`}
                    />
                    <span
                      className={`absolute text-2xl font-bold  ${
                        item.locked ? "text-gray-300" : "text-gray-700"
                      } ${
                        item.translate && "-translate-y-4.5 -translate-x-0.5"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                  <div className="w-full flex flex-row flex-wrap text-center items-center justify-center">
                    <p className="text-(--textColor) font-light">
                      {item.title}
                    </p>
                    <span className="text-(--grayText) text-xs">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="text-center items-center">
        <button
          onClick={() => setViewAll(!viewAll)}
          className="bg-white/10 py-3 px-12 rounded-full text-lg font-medium"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default RecordSections;
