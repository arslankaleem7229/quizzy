import { getRecents } from "../services/getRecents";
import { RecentAttemptCard } from "./RecentAttemptCard";

export async function RecentComponent() {
  const recents = await getRecents();
  const attempts = recents ?? [];

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
          const localization =
            attempt.quiz.localizations.find(
              (loc) => loc.language === attempt.language
            ) ?? attempt.quiz.localizations[0];
          const formattedDate = new Date(attempt.updatedAt).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" }
          );

          return (
            <RecentAttemptCard
              key={attempt.id}
              attempt={attempt}
              localization={{
                title: localization?.title,
                description: localization?.description,
                questionCount: localization?.questionCount,
              }}
              formattedDate={formattedDate}
            />
          );
        })}
      </div>
    </div>
  );
}
