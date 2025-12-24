import { AchievementSectionCard } from "./AchievementSectionCard";
import { BadgeCard } from "./BadgeCard";
import { studyingBadges } from "../data/data";

export function StudyingSection() {
  return (
    <AchievementSectionCard title="Studying">
      <div className="py-6 px-4 md:p-16">
        <div className="flex flex-row flex-wrap pb-8 gap-x-8 gap-y-12 justify-start">
          {studyingBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </AchievementSectionCard>
  );
}
