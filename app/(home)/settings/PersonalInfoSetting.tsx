"use client";
import SettingEditButtonRow from "./components/SettingEditButtonRow";
import SettingDropDownRow from "./components/SettingDropDownRow";
import Image from "next/image";
import { HiOutlinePlus } from "react-icons/hi2";
import { avatars } from "./avatars";
import { UserWithPreferenceResponse } from "@/lib/types/api";

type props = {
  userImage: string;
  images: string[];
  name: string;
};

export default function PersonalInfoSetting({ userImage, name }: props) {
  /*TODO: Add Loader Logic */
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    const res = await fetch("/api/settings", {
      method: "PATCH",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Request failed");
    }

    const result: UserWithPreferenceResponse = await res.json();
    console.log(result);
  };

  const handleClick = async (url: string) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        body: JSON.stringify({ url: url }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const result: UserWithPreferenceResponse = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="font-medium">Personal information</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <div className="p-4 flex flex-wrap items-center gap-3">
          <p className="font-medium tracking-wide">Profile picture</p>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="relative shrink-0 flex h-24 w-24 items-center justify-center rounded-full bg-[#2e3856] text-5xl font-medium uppercase overflow-hidden">
              {/* {selectedAvatar} */}
              {userImage ? (
                <Image
                  src={userImage}
                  alt="userImage"
                  fill
                  className="object-cover"
                />
              ) : (
                name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {avatars.map((avatar) => {
                console.log(avatar);
                return (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => handleClick(avatar)}
                    className={`relative flex h-12 w-12 m-1 items-center justify-center rounded-full text-sm font-semibold uppercase transition overflow-hidden`}
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
              <label className="flex h-12 w-12 m-1 items-center justify-center rounded-full border border-dashed border-(--foreground)/30 text-(--foreground)/70 transition hover:border-(--foreground)">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <HiOutlinePlus className="h-5 w-5" />
              </label>
            </div>
          </div>
        </div>
        <div className="">
          <SettingEditButtonRow label="Username" value="arslankaleem">
            Edit
          </SettingEditButtonRow>
          <SettingEditButtonRow
            label="Email"
            value="arslankaleem7@gmail.com"
            enableTopBorder={false}
          >
            Edit
          </SettingEditButtonRow>
          <SettingDropDownRow
            label={"Account type"}
            value={"Student"}
            actionLabel="Student"
          >
            <option key={"Student"} value={"Student"}>
              {"Student"}
            </option>
          </SettingDropDownRow>
          <SettingEditButtonRow label="School information" value="Not set">
            Edit
          </SettingEditButtonRow>
        </div>
      </div>
    </section>
  );
}
