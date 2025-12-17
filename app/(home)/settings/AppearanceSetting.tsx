"use client";

import {
  UserWithPreference,
  UserWithPreferenceResponse,
} from "@/lib/types/api";
import SettingDropDownRow from "./components/SettingDropDownRow";
import { Theme } from "@/app/generated/prisma";
import { useTheme } from "next-themes";
import { useState } from "react";

type AppearanceProps = {
  user: UserWithPreference;
};

type UpdateUserSettingsPayload = {
  username?: string;
  email?: string;
  url?: string;
  accountType?: string;

  theme?: string;
  language?: string;

  notifications?: {
    emailFrequency?: string;
    productUpdates?: boolean;
    salesPromotions?: boolean;
    streaksBadges?: boolean;
    reminders?: boolean;
  };
};

const AppearanceSetting = ({ user }: AppearanceProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const { userPreferences } = currentUser;

  const { setTheme } = useTheme();

  const handleUpdates = async (
    payload: UpdateUserSettingsPayload
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }

      const result: UserWithPreferenceResponse = await res.json();
      if (result.success) {
        setCurrentUser(result.data ?? user);
        return true;
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
      return false;
    }
  };

  const themeOptions = Object.values(Theme);
  return (
    <section className="space-y-4 text-(--textColor)">
      <h2 className=" font-medium">Appearance</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <SettingDropDownRow
          label={"Theme"}
          isLoading={isLoading}
          options={themeOptions}
          value={userPreferences?.theme ?? "DARK"}
          onClick={(option) => {
            handleUpdates({ theme: option });
            if (option !== Theme.AUTO) {
              setTheme(option.toLowerCase());
            }
          }}
        />
        {/*TODO: add language support*/}
        <SettingDropDownRow
          label={"Language"}
          isLoading={isLoading}
          options={themeOptions}
          value={user.userPreferences?.language ?? "en"}
          onClick={(option) => console.log(option)}
        />
      </div>
    </section>
  );
};

export default AppearanceSetting;
