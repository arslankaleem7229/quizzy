"use client";
import { useState } from "react";
import SettingEditButtonRow from "./SettingEditButtonRow";
import { HiOutlineChevronDown } from "react-icons/hi2";
import NotificationSettingButtonRow from "./NotificationSettingButtonRow";
import { NotificationSettingProps } from "../types";
import { useUserSettings } from "../hooks";

const NotificationSetting = ({ user }: NotificationSettingProps) => {
  const { currentUser, isLoading, updateSettings } = useUserSettings(user);
  const [studyUpdatesOpen, setStudyUpdatesOpen] = useState(true);
  const [quizletUpdatesOpen, setQuizletUpdatesOpen] = useState(false);

  const { notificationSettings } = currentUser;

  return (
    <section className="space-y-4 text-(--textColor)">
      <h2 className=" font-medium">Notifications</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <SettingEditButtonRow
          label={"Personalised study updates"}
          value={""}
          onAction={() => setStudyUpdatesOpen((prev) => !prev)}
          enableTopBorder={false}
          enableBottomBorder={true}
        >
          <HiOutlineChevronDown
            className={`h-5 w-5 transition text-(--textColor) ${
              studyUpdatesOpen ? "rotate-180" : ""
            }`}
          />
        </SettingEditButtonRow>

        {studyUpdatesOpen && (
          <div className="">
            <NotificationSettingButtonRow
              label={"Streaks and badges"}
              value={notificationSettings?.streaksAndBadges ?? false}
              isLoading={isLoading}
              onClick={() => {
                updateSettings({
                  notifications: {
                    streaksBadges: !notificationSettings?.streaksAndBadges,
                  },
                });
              }}
            />
            <NotificationSettingButtonRow
              label={"Study reminders"}
              value={notificationSettings?.studyReminders ?? false}
              isLoading={isLoading}
              onClick={() => {
                updateSettings({
                  notifications: {
                    reminders: !notificationSettings?.studyReminders,
                  },
                });
              }}
            />
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
            <NotificationSettingButtonRow
              label={"New features, tips and study challenges"}
              value={notificationSettings?.featuresAndTips ?? false}
              isLoading={isLoading}
              onClick={() => {
                updateSettings({
                  notifications: {
                    productUpdates: !notificationSettings?.featuresAndTips,
                  },
                });
              }}
            />
            <NotificationSettingButtonRow
              label={"Sales, giveaways and promotions"}
              value={notificationSettings?.salesAndPromotions ?? false}
              isLoading={isLoading}
              onClick={() => {
                updateSettings({
                  notifications: {
                    salesPromotions: !notificationSettings?.salesAndPromotions,
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default NotificationSetting;
