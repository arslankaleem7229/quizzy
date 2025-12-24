import { AchievementSectionCard } from "./AchievementSectionCard";
import CustomCalendar from "./Calender";
import { RecentlyEarnedBadge } from "./RecentlyEarnedBadge";
import { CurrentStreakDisplay } from "./CurrentStreakDisplay";

export function RecentActivity() {
  return (
    <AchievementSectionCard title="Recent activity">
      <div className="flex w-full flex-wrap items-start justify-evenly gap-6 md:pt-16">
        <RecentlyEarnedBadge badgeType="5 sets studied" count={5} />

        <div className="w-[20rem] mb-8">
          <CustomCalendar />
        </div>

        <CurrentStreakDisplay weekCount={5} daysInWeek={4} />
      </div>
    </AchievementSectionCard>
  );
}
