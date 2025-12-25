"use client";
import SettingEditButtonRow from "./SettingEditButtonRow";
import Image from "next/image";
import { HiOutlinePlus } from "react-icons/hi2";
import { Spinner } from "@heroui/spinner";
import { UserRole } from "@/app/generated/prisma";
import { XIcon } from "lucide-react";
import { UserWithPreference } from "@/lib/types";
import { usePersonalInfoSettings } from "../hooks/usePersonalInfoSettings";
import SettingDropDownRow from "./SettingDropDownRow";

type props = {
  user: UserWithPreference;
};

export default function PersonalInfoSetting({ user }: props) {
  const {
    error,
    newUsername,
    isLoading,
    currentImage,
    availableImages,
    currentUser,
    closeDrawer,
    openDrawer,
    setNewUsername,
    handleChange,
    handleClick,
    handleUpdates,
  } = usePersonalInfoSettings(user);

  const { email, role, username, name } = currentUser;

  const handleOpenUsername = () => {
    openDrawer(
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col space-y-4 bg-(--background)">
          <button
            className="flex justify-end items-end"
            onClick={() => closeDrawer()}
          >
            <XIcon className="h-8 w-8 p-2 bg-(--grayText)/20 text-white rounded-full" />
          </button>
          <h1 className="text-(--textColor) text-2xl font-bold">
            Change username
          </h1>
          <div className="flex-1 py-2 flex justify-center">
            <div className="w-full flex bg-gray-100 rounded ">
              <input
                type="email"
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder={"enter username"}
                className="email-input w-full px-3 py-4 rounded text-black outline-none placeholder:text-base placeholder:font-medium placeholder:text-gray-400 placeholder:tracking-wider"
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-(--primary) rounded-full py-2 px-4"
              onClick={() => {
                if (newUsername) {
                  handleUpdates({ username: newUsername }).then(() =>
                    closeDrawer()
                  );
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-4">
      <h2 className="font-medium">Personal information</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <div className="p-4 flex flex-wrap items-center gap-3">
          <p className="font-medium tracking-wide">Profile picture</p>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="relative shrink-0 flex h-24 w-24 items-center justify-center rounded-full bg-[#2e3856] text-5xl font-medium uppercase overflow-hidden">
              {currentImage ? (
                <>
                  <Image
                    src={currentImage}
                    alt="userImage"
                    fill
                    className="object-cover"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-transparent flex items-center justify-center z-10">
                      <Spinner size="lg" color="default" />
                    </div>
                  )}
                </>
              ) : (
                name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableImages.map((avatar) => {
                return (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => handleClick(avatar)}
                    disabled={isLoading}
                    className={`relative flex h-12 w-12 m-1 items-center justify-center rounded-full text-sm font-semibold uppercase transition overflow-hidden ${
                      isLoading ? "opacity-60" : ""
                    }`}
                  >
                    <Image
                      src={avatar}
                      alt={avatar}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
              <label
                className={`flex h-12 w-12 m-1 items-center justify-center rounded-full border border-dashed border-(--foreground)/30 text-(--foreground)/70 transition hover:border-(--foreground) ${
                  isLoading ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files?.[0]) return;
                    handleChange(e.target.files[0]);
                  }}
                  className="hidden"
                />
                <HiOutlinePlus className="h-5 w-5" />
              </label>
            </div>
          </div>
        </div>
        <div className="">
          <SettingEditButtonRow
            label="Username"
            value={username ?? email ?? ""}
            onAction={handleOpenUsername}
          >
            Edit
          </SettingEditButtonRow>
          <SettingEditButtonRow
            label="Email"
            value={email ?? ""}
            enableTopBorder={false}
          >
            Edit
          </SettingEditButtonRow>
          <SettingDropDownRow
            label={"Account type"}
            value={role}
            options={[UserRole.STUDENT, UserRole.TEACHER]}
            isLoading={isLoading}
            onClick={(option) => handleUpdates({ accountType: option })}
          />

          <SettingEditButtonRow label="School information" value="Not set">
            Edit
          </SettingEditButtonRow>
        </div>
      </div>
    </section>
  );
}
