import { GenerateByAI } from "@/features/latest/components/GenerateByAI";
import { PopularFlashCards } from "@/features/latest/components/PopularFlashCards";
import { PopularTextbooks } from "@/features/latest/components/PopularTextbooks";
import { RecentComponent } from "@/features/latest/components/RecentComponent";

export default async function Latest() {
  return (
    <main className="flex w-full min-h-screen bg-(--background) text-(--textColor)">
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
}
