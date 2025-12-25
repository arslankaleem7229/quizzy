import { PopularTextbooks } from "@/features/latest/components/PopularTextbooks";
import getUserLibrary from "@/features/library/services/getUserLibrary";

import ClassesSection from "@/features/search/components/ClassesSection";
import FlashCardSetsSection from "@/features/search/components/FlashCardSetsSection";
import PracticeTestsSection from "@/features/search/components/PracticeTestsSection";
import QuestionsSection from "@/features/search/components/QuestionsSection";
import SearchHeader from "@/features/search/components/SearchHeader";
import StudyGuidesSection from "@/features/search/components/StudyGuidesSection";
import UsersSection from "@/features/search/components/UsersSection";

const UserLibrary = async () => {
  const flashcards = await getUserLibrary();
  return (
    <main className="flex w-full min-h-screen bg-(--background)">
      <section className=" flex flex-1 flex-col px-4 py-8 lg:px-12 mx-auto w-full max-w-6xl gap-8">
        <SearchHeader />
        <FlashCardSetsSection
          header={"Flashcard sets"}
          results={flashcards}
          isSearching={false}
        />
        {/* TODO: Change of schema for practce/flashcard/books/guides/questions */}
        <PracticeTestsSection />
        <PopularTextbooks classname="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3 text-(--textColor)" />
        <StudyGuidesSection />
        <QuestionsSection />
        <UsersSection />
        <ClassesSection />

        <div className="rounded-3xl border-(--foreground)/10 border-2 bg-(--background) px-6 py-10 text-center text-sm text-(--grayText)">
          Use filters to jump into practice tests, textbooks, and more. You can
          fine-tune the search once content is ready.
        </div>
      </section>
    </main>
  );
};

export default UserLibrary;
