import Image from "next/image";
import LatestBadge from "@/public/achivements/badge-SetsStudied.svg";

interface RecentlyEarnedBadgeProps {
  badgeType: string;
  count: number;
}

export function RecentlyEarnedBadge({
  badgeType,
  count,
}: RecentlyEarnedBadgeProps) {
  return (
    <div className="flex flex-nowrap w-full lg:w-auto mb-8 flex-col items-center gap-1 text-center">
      <p className="font-bold text-(--textColor)">Recently earned</p>
      <p className="text-(--grayText) text-sm">{badgeType}</p>

      <div className="flex relative items-center justify-center">
        <Image className="object-contain" src={LatestBadge} alt="LatestBadge" />
        <span className="absolute text-2xl font-bold text-gray-700 -translate-y-4.5 -translate-x-0.5">
          {count}
        </span>
      </div>
    </div>
  );
}
