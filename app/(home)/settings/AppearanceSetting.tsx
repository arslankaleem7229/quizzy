"use client";
import { useState } from "react";
import SettingDropDownRow from "./components/SettingDropDownRow";

const AppearanceSetting = () => {
  const themeOptions = ["Auto", "Dark", "Light"];
  const languages = ["English (UK)", "English (US)", "Deutsch", "Español"];
  const [theme, setTheme] = useState("Auto");
  const [language, setLanguage] = useState("English (UK)");
  return (
    <section className="space-y-4">
      <h2 className="text-white font-medium">Appearance</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <SettingDropDownRow
          label={"Theme"}
          value={theme}
          actionLabel={theme}
          onAction={(event) => setTheme(event.target.value)}
        >
          {themeOptions.map((option) => (
            <option key={option} value={option} className="bg-[#111536]">
              {option}
            </option>
          ))}
        </SettingDropDownRow>
        <SettingDropDownRow
          label={"Language"}
          value={language}
          actionLabel={language}
          onAction={(event) => setTheme(event.target.value)}
        >
          {languages.map((option) => (
            <option key={option} value={option} className="bg-[#111536]">
              {option}
            </option>
          ))}
        </SettingDropDownRow>
      </div>
    </section>
  );
};

export default AppearanceSetting;
