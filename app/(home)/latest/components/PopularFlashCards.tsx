import { flashcardSets } from "../temp_data";

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
            className={`rounded-lg hover:bg-(--latest-card) transition border-white/5 bg-white/3 duration-0 px-5 py-4 h-40 flex flex-col justify-between items-start`}
          >
            <div className="w-full">
              <div className="text-base font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                {set.title}
              </div>
              <div className="mt-2 inline-flex items-center rounded-full bg-(--latest-card) px-2 py-0.75 text-xs text-(--foreground)/70">
                {set.terms}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-(--foreground)/70">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-(--latest-card) text-xs">
                {set.author[0]}
              </div>

              <div className="font-medium text-(--foreground)/90">
                {set.author}
              </div>
              <div className="text-xs text-(--foreground)/50 rounded-full bg-(--latest-card) px-1">
                {set.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularFlashCards;
