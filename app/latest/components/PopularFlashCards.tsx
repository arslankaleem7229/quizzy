import { flashcardSets } from "./../temp_data";

const PopularFlashCards = () => {
  return (
    <div>
      <div className="text-sm font-semibold text-(--foreground)/80">
        Popular flashcard sets
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {flashcardSets.map((set) => (
          <div
            key={set.title}
            className="rounded-2xl border border-white/5 bg-white/3 px-5 py-4"
          >
            <div className="text-lg font-semibold">{set.title}</div>
            <div className="mt-2 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-(--foreground)/70">
              {set.terms}
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-(--foreground)/70">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs">
                {set.author[0]}
              </div>
              <div>
                <div className="font-medium text-(--foreground)/90">
                  {set.author}
                </div>
                <div className="text-xs text-(--foreground)/50">{set.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularFlashCards;
