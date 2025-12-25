"use client";
import { useState } from "react";
import deleteAccount from "../services/deleteAccount";
import { signOut } from "next-auth/react";
import {
  AccountAndPrivacySettingProps,
  AccountSettingsPayload,
} from "../types";
import { unlinkAccount } from "../services/unlinkAccount";

export function useAccountPrivacySetting({
  user,
}: AccountAndPrivacySettingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const isFacebookConnected = currentUser.accounts.find(
    (a) => a.provider.toLowerCase() == "facebook"
  );
  const isGoogleConnected = currentUser.accounts.find(
    (a) => a.provider.toLowerCase() == "google"
  );

  const handleUpdates = async (
    payload: AccountSettingsPayload
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await unlinkAccount(payload);
      if (result.success) {
        setCurrentUser(result.user ?? user);
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
      return false;
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteAccount();
      if (result.success) {
        signOut();
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [privacyToggles, setPrivacyToggles] = useState({
    showRealName: true,
    googleSearch: false,
  });

  return {
    isLoading,
    isGoogleConnected,
    privacyToggles,
    handleDelete,
    isFacebookConnected,
    handleUpdates,
    setPrivacyToggles,
  };
}
