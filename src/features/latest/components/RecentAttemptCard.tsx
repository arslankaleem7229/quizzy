import Link from "next/link";
import { RecentAttemptCardProps } from "../types";

export function RecentAttemptCard({
  attempt,
  localization,
  formattedDate,
}: RecentAttemptCardProps) {
  return (
    <Link
      href={`/flashcard-sets/${attempt.quizId}`}
      className="rounded-lg hover:bg-(--cardColorHover) px-3 py-2 transition duration-0"
    >
      <div className="flex flex-row items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--cardColorHover) text-lg text-(--textColor)/80">
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-(--latest-image)/50"
          >
            <rect
              x="4"
              y="5"
              width="16"
              height="14"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 9h8M8 13h5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-col justify-center items-start h-full">
          <div className="text-sm">
            {localization?.title ?? attempt.quiz.slug}
          </div>
          <p className="text-[12px] font-light text-(--textColor)/70">
            {localization?.description || ""}
          </p>
          <p className="text-[11px] text-(--textColor)/50">
            {` ${attempt.status.replace("_", " ").toLowerCase()} • ${
              localization?.questionCount ?? null
            } • ${formattedDate}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
