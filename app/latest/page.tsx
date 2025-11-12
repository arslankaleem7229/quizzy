import GenerateByAI from "./components/GenerateByAI";
import PopularFlashCards from "./components/PopularFlashCards";
import RecentComponent from "./components/RecentComponent";
import { textbooks } from "./temp_data";

const Latest = () => {
  return (
    <main className="flex w-full min-h-screen bg-(--background) text-(--foreground)">
      {/* TODO: Uncomment this sidebase 
       <Sidebar /> */}

      <section className="flex flex-1 flex-col px-6 pb-5 lg:px-12">
        <div className="grid gap-8">
          <RecentComponent />
          <GenerateByAI />
          <PopularFlashCards />

          <div className="pb-16">
            <div className="text-sm font-semibold text-(--foreground)/80">
              Popular textbooks
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {textbooks.map((book) => (
                <div
                  key={book.title}
                  className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.03] p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-xs font-semibold text-(--foreground)/80">
                      {book.cover}
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{book.title}</div>
                      <p className="text-xs text-(--foreground)/60">
                        {book.edition}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-(--foreground)/60">
                    {book.authors}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-(--foreground)/70">
                    <span>💡</span>
                    {book.solutions}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Latest;
