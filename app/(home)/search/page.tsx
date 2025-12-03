import SearchHeader from "./components/SearchHeader";
import FlashCardSetsSection from "./components/FlashCardSetsSection";
import StudyGuidesSection from "./components/StudyGuidesSection";
import PracticeTestsSection from "./components/PracticeTestsSection";
import QuestionsSection from "./components/QuestionsSection";
import UsersSection from "./components/UsersSection";
import ClassesSection from "./components/ClassesSection";
import PopularTextbooks from "../latest/components/PopularTextbooks";

const SearchPage = () => {
  return (
    <main className="flex w-full min-h-screen bg-(--background)">
      <section className=" flex flex-1 flex-col px-4 py-8 lg:px-12 mx-auto w-full max-w-6xl gap-8">
        <SearchHeader />
        <FlashCardSetsSection />
        <PracticeTestsSection />
        <PopularTextbooks classname="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3 text-(--textColor)" />
        <StudyGuidesSection />
        <QuestionsSection />
        <UsersSection />
        <ClassesSection />

        <div className="rounded-3xl border-(--forground)/10 border-2 bg-(--background) px-6 py-10 text-center text-sm text-(--grayText)">
          Use filters to jump into practice tests, textbooks, and more. You can
          fine-tune the search once content is ready.
        </div>
      </section>
    </main>
  );
};

export default SearchPage;
