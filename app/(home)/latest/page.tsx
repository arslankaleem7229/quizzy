import GenerateByAI from "./components/GenerateByAI";
import PopularFlashCards from "./components/PopularFlashCards";
import PopularTextbooks from "./components/PopularTextbooks";
import RecentComponent from "./components/RecentComponent";
import Sidebar from "./components/Sidebar";

const Latest = () => {
  return (
    <main className="flex w-full min-h-screen bg-(--background) text-(--textColor)">
      <Sidebar />

      <section className="flex flex-1 flex-col px-6 pb-5 lg:px-12">
        <div className="grid gap-8">
          <RecentComponent />
          <GenerateByAI />
          <PopularFlashCards />
          <PopularTextbooks />
        </div>
      </section>
    </main>
  );
};

export default Latest;
