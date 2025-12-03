"use client";
import { useState } from "react";
import SettingEditButtonRow from "./components/SettingEditButtonRow";
import { HiOutlineChevronDown, HiOutlineEnvelope } from "react-icons/hi2";

const NotificationSetting = () => {
  const [studyUpdatesOpen, setStudyUpdatesOpen] = useState(true);
  const [quizletUpdatesOpen, setQuizletUpdatesOpen] = useState(false);
  return (
    <section className="space-y-4 text-(--textColor)">
      <h2 className=" font-medium">Notifications</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <SettingEditButtonRow
          label={"Personalised study updates"}
          value={""}
          onAction={() => setStudyUpdatesOpen((prev) => !prev)}
          enableTopBorder={false}
          enableBottomBorder={false}
        >
          <HiOutlineChevronDown
            className={`h-5 w-5 transition text-(--textColor) ${
              studyUpdatesOpen ? "rotate-180" : ""
            }`}
          />
        </SettingEditButtonRow>

        {studyUpdatesOpen && (
          <div className="">
            <SettingEditButtonRow label={"Streaks and badges"} value={""}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-(--grayColor) transition">
                <HiOutlineEnvelope className="h-5 w-5" />
              </div>
            </SettingEditButtonRow>
            <SettingEditButtonRow label={"Study reminders"} value={""}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-(--grayColor) transition">
                <HiOutlineEnvelope className="h-5 w-5" />
              </div>
            </SettingEditButtonRow>
          </div>
        )}
      </div>
      <div className="rounded-xl border-2 border-gray-700">
        <SettingEditButtonRow
          label={"Quizlet updates"}
          value={""}
          onAction={() => setQuizletUpdatesOpen((prev) => !prev)}
          enableTopBorder={false}
        >
          <HiOutlineChevronDown
            className={`h-5 w-5 transition text-(--textColor) ${
              quizletUpdatesOpen ? "rotate-180" : ""
            }`}
          />
        </SettingEditButtonRow>

        {quizletUpdatesOpen && (
          <div className="">
            <SettingEditButtonRow
              enableTopBorder={false}
              label={"New features, tips and study challenges"}
              value={""}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-(--grayColor) transition">
                <HiOutlineEnvelope className="h-5 w-5" />
              </div>
            </SettingEditButtonRow>
            <SettingEditButtonRow
              label={"Sales, giveaways and promotions"}
              value={""}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-(--grayColor) transition">
                <HiOutlineEnvelope className="h-5 w-5" />
              </div>
            </SettingEditButtonRow>
          </div>
        )}
      </div>
    </section>
  );
};

export default NotificationSetting;
