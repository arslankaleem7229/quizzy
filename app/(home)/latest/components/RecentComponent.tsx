import { RecentAttempt } from "@/lib/types/api";

export default async function RecentComponent({
  recents,
}: {
  recents: RecentAttempt[];
}) {
  const attempts = recents ?? [];

  const getLocalization = (attempt: RecentAttempt) =>
    attempt.quiz.localizations.find(
      (loc) => loc.language === attempt.language
    ) ?? attempt.quiz.localizations[0];

  if (!attempts.length) {
    return (
      <div>
        <div className="px-1 md:px-3 py-3 text-md font-base text-(--textColor)/80">
          Recents
        </div>
        <div className="rounded-lg bg-(--cardColor) mx-3 px-4 py-3 text-sm text-(--textColor)/70">
          Start studying to see your recent activity here.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="px-1 md:px-3 py-3 text-md font-base text-(--textColor)/80">
        Recents
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {attempts.map((attempt) => {
          const localization = getLocalization(attempt);
          const formattedDate = new Date(attempt.updatedAt).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" }
          );
          // const meta = [
          //  ,
          //   termsCount ? `${termsCount} terms` : null,
          //   formattedDate,
          // ].filter((item): item is string => Boolean(item));

          return (
            <div
              key={attempt.id}
              className={`rounded-lg hover:bg-(--cardColorHover) px-3 py-2 transition duration-0`}
            >
              <div className="flex flex-row items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-(--cardColorHover) text-lg text-(--textColor)/80`}
                >
                  <svg
                    aria-hidden
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`h-6 w-6 text-(--latest-image)/50`}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
