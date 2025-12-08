import AchivementSectionCard from "./components/AchivementSectionCard";
import RecentActivity from "./components/RecentActivity";
import RecordSections from "./components/RecordSections";

import StudyingSection from "./components/StudyingSection";
import { allSteakSections } from "./data";

const AchievementsPage = () => {
  return (
    <main className="flex w-full min-h-screen bg-(--background) text-(--textColor)">
      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-7 px-10 py-6 lg:px-8">
        <header className="relative flex flex-col gap-2">
          <h1 className="text-4xl font-medium leading-tight sm:text-4xl">
            Achievements
          </h1>
          <p className="text-sm text-(--grayText)">
            Celebrate streaks, badges, and milestones earned while studying.
          </p>
        </header>

        <RecentActivity />

        <StudyingSection />

        {allSteakSections.map((section) => {
          return (
            <AchivementSectionCard key={section.header} title={section.header}>
              <div className="py-6 px-4 md:p-16">
                <div className="flex flex-row flex-wrap pb-8 gap-x-8 gap-y-12 justify-start">
                  {section.components.map((component) => (
                    <RecordSections
                      key={component.title}
                      component={component}
                    />
                  ))}
                </div>
              </div>
            </AchivementSectionCard>
          );
        })}
      </section>
    </main>
  );
};

export default AchievementsPage;
