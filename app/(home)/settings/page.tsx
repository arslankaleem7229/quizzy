import { cookies } from "next/headers";
import AccountAndPrivacySetting from "./AccountAndPrivacySetting";
import AppearanceSetting from "./AppearanceSetting";
import NotificationSetting from "./NotificationSetting";
import PersonalInfoSetting from "./PersonalInfoSetting";
import { UserWithPreferenceResponse } from "@/lib/types/api";

export default async function SettingsPage() {
  const res = await fetch(process.env.APP_URL + "/api/settings", {
    cache: "no-store",
    credentials: "include",
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  if (!res.ok) throw new Error("Failed to load user details");

  const data: UserWithPreferenceResponse = await res.json();

  if (!data.success) throw new Error("Something went wrong");

  const user = data.data;

  return (
    <main className="min-h-screen w-full bg-(--background) text-(--textColor)">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 md:gap-10 px-4 pb-24 pt-5 md:pt-8 lg:px-0">
        <header>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold tracking-wide">
            Settings
          </h1>
        </header>

        <section className="space-y-3">
          <h2 className="font-medium">Subscription</h2>
          <div className="flex items-center md:block rounded-lg md:rounded-3xl bg-linear-to-r from-[#7f8bff] to-[#c2c8ff] px-4 py-2 sm:p-6 md:p-6 text-(--background)">
            <p className="flex flex-1 md:block text-xl font-semibold">
              Level up with Q+
            </p>
            <p className="hidden md:block mt-1 text-sm text-[#2f2f53]">
              Unlock smarter studying across all your sets.
            </p>
            <button
              type="button"
              className="md:block md:mt-4 inline-flex rounded-full bg-[#FFCD1F] px-5 py-2 text-base font-medium text-[#0f0f2d] transition hover:bg-[#FFDC62]"
            >
              Upgrade now
            </button>
          </div>
        </section>

        <PersonalInfoSetting
          userImage={user.image ?? ""}
          images={user.images}
          name={user.name ?? ""}
        />
        <AppearanceSetting />
        <NotificationSetting />
        <AccountAndPrivacySetting />
      </div>
    </main>
  );
}
