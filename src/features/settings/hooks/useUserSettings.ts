"use client";
import { useCallback, useState } from "react";
import {
  UpdateUserSettingsPayload,
  UpdateSettingsResult,
  UseUserSettingsResult,
} from "../types";
import { UserWithPreference } from "@/lib/types";
import { updateUserSettings } from "../services/updateUserSettings";

export function useUserSettings(
  initialUser: UserWithPreference
): UseUserSettingsResult {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  const updateSettings = useCallback(
    async (
      payload: UpdateUserSettingsPayload
    ): Promise<UpdateSettingsResult> => {
      setIsLoading(true);
      try {
        const result = await updateUserSettings(payload);
        if (result.success) {
          const nextUser = result.user ?? initialUser;
          setCurrentUser(nextUser);
          return { success: true, user: nextUser };
        }

        throw new Error(result.error);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Request failed",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [initialUser]
  );

  return { currentUser, isLoading, updateSettings, setCurrentUser };
}
