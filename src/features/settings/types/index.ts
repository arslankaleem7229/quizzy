import { UserWithPreference } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

export interface UpdateUserSettingsPayload {
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
}

export interface UpdateSettingsResult {
  success: boolean;
  user?: UserWithPreference;
  error?: string;
}

export interface AccountSettingsPayload {
  id: string;
  userId: string;
  provider?: "google" | "facebook";
}

export interface PrivacyToggles {
  showRealName: boolean;
  googleSearch: boolean;
}

export interface Avatar {
  image: string;
  index: number;
}

export interface AppearanceSettingProps {
  user: UserWithPreference;
}

export interface NotificationSettingProps {
  user: UserWithPreference;
}

export interface PersonalInfoSettingProps {
  user: UserWithPreference;
}

export interface AccountAndPrivacySettingProps {
  user: UserWithPreference;
}

export interface SettingDropDownRowProps {
  label: string;
  value: string;
  options: string[];
  isLoading?: boolean;
  onClick?: (option: string) => void;
}

export interface SettingEditButtonRowProps {
  label: string;
  value: string;
  onAction?: () => void;
  enableTopBorder?: boolean;
  enableBottomBorder?: boolean;
  children?: React.ReactNode;
}

export interface SettingCustomButtonRowProps {
  label: string;
  desc?: string;
  enableTopBorder?: boolean;
  enableBottomBorder?: boolean;
  children?: React.ReactNode;
}

export interface NotificationSettingButtonRowProps {
  label: string;
  value: boolean;
  isLoading: boolean;
  onClick?: () => void;
}

export interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

export interface UseUserSettingsResult {
  currentUser: UserWithPreference;
  isLoading: boolean;
  updateSettings: (
    payload: UpdateUserSettingsPayload
  ) => Promise<UpdateSettingsResult>;
  setCurrentUser: Dispatch<SetStateAction<UserWithPreference>>;
}

export interface UseImageManagementReturn {
  currentImage: string | null;
  availableImages: string[];
  updateCurrentImage: (nextImage: string | null) => void;
  resetImages: (userImage: string | null, userImages: string[]) => void;
}

export interface ChangeUsernameDrawerProps {
  currentUsername: string;
  onSave: (username: string) => Promise<void>;
  onClose: () => void;
  error?: string | null;
}

export interface UpdateUserSettingsPayload {
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
}
