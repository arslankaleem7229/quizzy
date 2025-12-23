import { QuizWithoutLocalization } from "@/lib/types/api";
import Image from "next/image";
import Link from "next/link";

export default function PopularFlashCards({
  flashcards,
}: {
  flashcards: QuizWithoutLocalization[];
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-(--textColor)/80">
        Popular flashcard sets
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {flashcards.map((quizz) => (
          <Link
            key={quizz.id}
            href={{
              pathname: `/flashcard-set/${quizz.id}`,
            }}
          >
            <div
              className={`rounded-lg hover:bg-(--cardColorHover) transition border-(--forground)/5 bg-(--foreground)/10 duration-0 px-5 py-4 h-40 flex flex-col justify-between items-start`}
            >
              <div className="w-full">
                <div className="text-base font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                  {quizz.slug.slugify()}
                </div>
                <div className="mt-2 inline-flex items-center rounded-full bg-(--capsule) px-2 py-0.75 text-xs text-(--textColor)/70">
                  {quizz.totalQuestions + " terms"}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-(--textColor)/70">
                {quizz.createdBy.image ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full relative overflow-clip">
                    <Image
                      src={quizz.createdBy.image}
                      alt={"creator image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-(--capsule) text-xs">
                    {quizz.createdBy.name![0].capitalize()}
                  </div>
                )}
                <div className="font-medium text-(--textColor)/90">
                  {quizz.createdBy.name}
                </div>
                <div className="text-xs text-(--textColor)/50 rounded-full bg-(--capsule) px-1">
                  {quizz.createdBy.role}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
