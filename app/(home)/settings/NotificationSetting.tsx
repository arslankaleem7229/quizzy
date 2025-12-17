"use client";
import { useState } from "react";
import SettingEditButtonRow from "./components/SettingEditButtonRow";
import { HiOutlineChevronDown } from "react-icons/hi2";
import {
  UserWithPreference,
  UserWithPreferenceResponse,
} from "@/lib/types/api";
import NotificationSettingButtonRow from "./components/NotificationSettingButtonRow";

type NotificationProps = {
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

const NotificationSetting = ({ user }: NotificationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [studyUpdatesOpen, setStudyUpdatesOpen] = useState(true);
  const [quizletUpdatesOpen, setQuizletUpdatesOpen] = useState(false);

  const { notificationSettings } = currentUser;

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
                handleUpdates({
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
                handleUpdates({
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
                handleUpdates({
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
                handleUpdates({
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
