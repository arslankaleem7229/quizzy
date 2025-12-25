"use client";
import { HiOutlineTrash } from "react-icons/hi2";
import SettingCustomButtonRow from "./SettingCustomButtonRow";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { AccountAndPrivacySettingProps } from "../types";
import { Toggle } from "./Toggle";
import { useAccountPrivacySetting } from "../hooks";

const AccountAndPrivacySetting = ({ user }: AccountAndPrivacySettingProps) => {
  const {
    isLoading,
    isGoogleConnected,
    privacyToggles,
    handleDelete,
    isFacebookConnected,
    handleUpdates,
    setPrivacyToggles,
  } = useAccountPrivacySetting({ user });

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
