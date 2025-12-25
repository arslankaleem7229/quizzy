"use client";
import { useState } from "react";
import { AchievementCategory } from "../types";
import { BadgeCard } from "./BadgeCard";
import { useResponsiveItemCount } from "../hooks/useResponsiveItemCount";

interface RecordSectionsProps {
  category: AchievementCategory;
}

export function RecordSections({ category }: RecordSectionsProps) {
  const [viewAll, setViewAll] = useState(false);
  const itemsToShow = useResponsiveItemCount();

  const displayedBadges = viewAll
    ? category.items
    : category.items.slice(0, itemsToShow);

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-xl font-light">{category.title}</h1>
      <div className="flex flex-row flex-wrap pb-8 gap-x-8 gap-y-12 md:justify-start justify-center">
        {displayedBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
      <div className="text-center items-center">
        <button
          onClick={() => setViewAll(!viewAll)}
          className="bg-white/10 py-3 px-12 rounded-full text-lg font-medium"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>
    </div>
  );
}
