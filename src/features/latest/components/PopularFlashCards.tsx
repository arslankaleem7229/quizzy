import { getFlashcards } from "../services/getFlashcards";
import { FlashcardSetCard } from "./FlashcardSetCard";

export async function PopularFlashCards() {
  const flashcards = await getFlashcards();
  return (
    <div>
      <div className="text-sm font-semibold text-(--textColor)/80">
        Popular flashcard sets
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {flashcards.map((quizz) => (
          <FlashcardSetCard key={quizz.id} quizz={quizz} />
        ))}
      </div>
    </div>
  );
}
