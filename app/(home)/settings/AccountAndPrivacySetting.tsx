"use client";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import SettingCustomButtonRow from "./components/SettingCustomButtonRow";

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

const AccountAndPrivacySetting = () => {
  const [privacyToggles, setPrivacyToggles] = useState({
    showRealName: true,
    googleSearch: false,
  });

  return (
    <section className="space-y-4">
      <h2 className="text-white font-medium">Account and privacy</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <div className="space-y-4">
          <SettingCustomButtonRow
            label={"Create a Quizlet password"}
            desc={"Required to log in outside social accounts."}
          >
            <button
              type="button"
              className="rounded-full px-5 py-3 text-sm font-medium"
            >
              Create
            </button>
          </SettingCustomButtonRow>

          <SettingCustomButtonRow
            label={"Connect your Facebook account"}
            desc={"Speed up sign-in across devices."}
          >
            <button
              type="button"
              className="flex gap-3 justify-center items-center rounded-full px-5 py-3 text-sm font-medium"
            >
              <FaFacebook className="h-5 w-5 text-blue-700" /> Link Facebook
            </button>
          </SettingCustomButtonRow>

          <div className="flex flex-col space-y-4 gap-2 pl-6 pr-10">
            <h2 className="text-white font-medium">Privacy</h2>
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
