import Image from "next/image";
import AchivementSectionCard from "./AchivementSectionCard";
import CustomCalendar from "./Calender";
import LatestBadge from "@/public/achivements/badge-SetsStudied.svg";
import StreakImage from "@/public/achivements/streak-flame.svg";

const RecentActivity = () => {
  return (
    <AchivementSectionCard title="Recent activity">
      <div className="flex w-full flex-wrap items-start justify-evenly gap-6 md:pt-16">
        <div className="flex flex-nowrap w-full lg:w-auto mb-8 flex-col items-center gap-1 text-center">
          <p className="font-bold text-(--textColor)">Recently earned</p>
          <p className="text-(--grayText) text-sm">5 sets studied</p>

          <div className="flex relative items-center justify-center">
            <Image
              className="object-contain"
              src={LatestBadge}
              alt="LatestBadge"
            />
            <span className="absolute text-2xl font-bold text-gray-700 -translate-y-4.5 -translate-x-0.5">
              5
            </span>
          </div>
        </div>

        <div className="w-[20rem] mb-8">
          <CustomCalendar />
        </div>

        <div className="flex min-w-20 max-w-150 flex-col gap-4 mb-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-bold text-center text-(--textColor)">
              Current streak
            </p>
            <p className=" text-xs text-(--textColor) text-center">5-week</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Image
                key={idx}
                src={StreakImage}
                alt={"streak-Image"}
                className={`h-8 w-8 ${
                  idx !== 0
                    ? "text-amber-400 drop-shadow-[0_5px_20px_rgba(255,193,7,0.35)]"
                    : "text-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </AchivementSectionCard>
  );
};

export default RecentActivity;
