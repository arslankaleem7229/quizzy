import { cookies } from "next/headers";
import PopularTextbooks from "../latest/components/PopularTextbooks";
import {
  SearchQuizResult,
  QuizzesResponse,
  QuizWithoutLocalization,
} from "@/lib/types/api";
import ClassesSection from "../search/components/ClassesSection";
import FlashCardSetsSection from "../search/components/FlashCardSetsSection";
import PracticeTestsSection from "../search/components/PracticeTestsSection";
import QuestionsSection from "../search/components/QuestionsSection";
import SearchHeader from "../search/components/SearchHeader";
import StudyGuidesSection from "../search/components/StudyGuidesSection";
import UsersSection from "../search/components/UsersSection";

const UserLibrary = async () => {
  let results: SearchQuizResult[] = [];
  try {
    const cookieHeader = (await cookies()).toString();
    const res = await fetch(process.env.APP_URL + `/api/library`, {
      cache: "no-store",
      credentials: "include",
      headers: { cookie: cookieHeader },
    });

    if (res.ok) {
      const json: QuizzesResponse = await res.json();

      if (json.success) {
        results = json.data.map((quiz) => {
          return { quiz };
        });
      }
    }
  } catch (error) {
    throw error;
  }

  return (
    <main className="flex w-full min-h-screen bg-(--background)">
      <section className=" flex flex-1 flex-col px-4 py-8 lg:px-12 mx-auto w-full max-w-6xl gap-8">
        <SearchHeader />
        <FlashCardSetsSection
          header={"Flashcard sets"}
          results={results}
          query={"query"}
          isSearching={false}
        />
        {/* TODO: Change of schema for practce/flashcard/books/guides/questions */}
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

export default UserLibrary;
