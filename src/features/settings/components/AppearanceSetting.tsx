"use client";

import { Theme } from "@/app/generated/prisma";
import { useTheme } from "next-themes";
import { useUserSettings } from "../hooks";
import { AppearanceSettingProps } from "../types";
import SettingDropDownRow from "./SettingDropDownRow";

const AppearanceSetting = ({ user }: AppearanceSettingProps) => {
  const { currentUser, isLoading, updateSettings } = useUserSettings(user);
  const { userPreferences } = currentUser;

  const { setTheme } = useTheme();

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
            updateSettings({ theme: option });
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
          value={currentUser.userPreferences?.language ?? "en"}
          onClick={(option) => console.log(option)}
        />
      </div>
    </section>
  );
};

export default AppearanceSetting;
