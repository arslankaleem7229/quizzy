"use client";
import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import SettingCustomButtonRow from "./SettingCustomButtonRow";
import { signIn, signOut } from "next-auth/react";
import {
  DeleteAccountResponse,
  UserWithPreference,
  UserWithPreferenceResponse,
} from "@/lib/types/api";
import Image from "next/image";

const Toggle = ({
  isOn,
  onToggle,
}: {
  isOn: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
      isOn ? "bg-[#5465ff]" : "bg-[#2e3856]"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 rounded-full bg-white transition ${
        isOn ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

type AccountSettingsPayload = {
  id: string;
  userId: string;
  provider?: "google" | "facebook";
};

const AccountAndPrivacySetting = ({ user }: { user: UserWithPreference }) => {
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
      const res = await fetch("/api/settings/unlink", {
        method: "Delete",
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

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "Delete",
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }

      const result: DeleteAccountResponse = await res.json();
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

  return (
    <section className="space-y-4 text-(--textColor)">
      <h2 className="font-medium">Account and privacy</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <div className="">
          <SettingCustomButtonRow
            label={"Create a Quizlet password"}
            desc={"Required to log in outside social accounts."}
          >
            <button
              type="button"
              className="rounded-full px-5 py-3 text-sm font-medium text-white"
            >
              Create
            </button>
          </SettingCustomButtonRow>

          <SettingCustomButtonRow
            label={"Connect your Google account"}
            desc={"Speed up sign-in across devices."}
          >
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                if (!isGoogleConnected) signIn("Google");
                else
                  handleUpdates({
                    id: isGoogleConnected.id,
                    userId: user.id,
                    provider: "google",
                  });
              }}
              className="flex gap-3 justify-center items-center rounded-full px-5 py-3 text-sm font-medium text-white"
            >
              <div className="relative h-5 w-5">
                <Image
                  src={"/social-icons/google.png"}
                  alt={"google"}
                  className="h-5 w-5 "
                  fill
                />
              </div>
              {!isGoogleConnected ? "Link Google" : "Unlink Google"}
            </button>
          </SettingCustomButtonRow>

          <SettingCustomButtonRow
            label={"Connect your Facebook account"}
            desc={"Speed up sign-in across devices."}
          >
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                if (!isFacebookConnected) signIn("facebook");
                else
                  handleUpdates({
                    id: isFacebookConnected.id,
                    userId: user.id,
                    provider: "facebook",
                  });
              }}
              className="flex gap-3 justify-center items-center rounded-full px-5 py-3 text-sm font-medium text-white"
            >
              <div className="relative h-5 w-5">
                <Image
                  src={"/social-icons/facebook.png"}
                  alt={"google"}
                  className="h-5 w-5 "
                  fill
                />
              </div>
              {!isFacebookConnected ? "Link Facebook" : "Unlink Facebook"}
            </button>
          </SettingCustomButtonRow>

          <div className="flex flex-col space-y-4 py-4 gap-2 pl-6 pr-10">
            <h2 className="font-medium">Privacy</h2>
            <div className="flex justify-between">
              <p className="text-sm font-light">
                Show your actual name on Quizlet
              </p>
              <Toggle
                isOn={privacyToggles.showRealName}
                onToggle={() =>
                  setPrivacyToggles((prev) => ({
                    ...prev,
                    showRealName: !prev.showRealName,
                  }))
                }
              />
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-light">
                Show your profile in Google search results
              </p>
              <Toggle
                isOn={privacyToggles.showRealName}
                onToggle={() =>
                  setPrivacyToggles((prev) => ({
                    ...prev,
                    showRealName: !prev.showRealName,
                  }))
                }
              />
            </div>
          </div>

          <SettingCustomButtonRow
            label={"Delete your account"}
            desc={"This will delete all data and cannot be undone."}
            enableTopBorder
            enableBottomBorder={false}
          >
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-medium"
            >
              <HiOutlineTrash className="h-4 w-4" />
              Delete account
            </button>
          </SettingCustomButtonRow>
        </div>
      </div>
    </section>
  );
};

export default AccountAndPrivacySetting;
