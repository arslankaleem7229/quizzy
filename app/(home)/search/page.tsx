import { cookies } from "next/headers";
import SearchHeader from "./components/SearchHeader";
import FlashCardSetsSection from "./components/FlashCardSetsSection";
import StudyGuidesSection from "./components/StudyGuidesSection";
import PracticeTestsSection from "./components/PracticeTestsSection";
import QuestionsSection from "./components/QuestionsSection";
import UsersSection from "./components/UsersSection";
import ClassesSection from "./components/ClassesSection";
import PopularTextbooks from "../latest/components/PopularTextbooks";
import { SearchResponse, SearchQuizResult } from "@/lib/types/api";

type SearchPageProps = {
  searchParams?: {
    q?: string;
  };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = (await searchParams)?.q?.trim() ?? "";
  const cookieHeader = (await cookies()).toString();

  let results: SearchQuizResult[] = [];

  if (query) {
    try {
      const res = await fetch(
        process.env.APP_URL + `/api/search?q=${encodeURIComponent(query)}`,
        {
          cache: "no-store",
          credentials: "include",
          headers: { cookie: cookieHeader },
        }
      );

      if (res.ok) {
        const json: SearchResponse = await res.json();
        if (json.success) {
          results = json.data ?? [];
        }
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <main className="flex w-full min-h-screen bg-(--background)">
      <section className=" flex flex-1 flex-col px-4 py-8 lg:px-12 mx-auto w-full max-w-6xl gap-8">
        <SearchHeader query={query} total={results.length} />
        <FlashCardSetsSection
          header={query ? "Results" : "Flashcard sets"}
          results={results}
          query={query}
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

export default SearchPage;
