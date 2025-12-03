import React, { useMemo, useState } from "react";
import SettingEditButtonRow from "./components/SettingEditButtonRow";
import SettingDropDownRow from "./components/SettingDropDownRow";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { HiOutlinePlus } from "react-icons/hi2";

const avatarLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
];

const PersonalInfoSetting = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("A");

  const { data: session } = useSession();

  const user = useMemo(() => session?.user, [session]);

  return (
    <section className="space-y-4">
      <h2 className="text-white font-medium">Personal information</h2>
      <div className="rounded-xl border-2 border-gray-700">
        <div className="p-4 flex flex-wrap items-center gap-3">
          <p className="font-medium tracking-wide">Profile picture</p>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="relative shrink-0 flex h-24 w-24 items-center justify-center rounded-full bg-[#2e3856] text-5xl font-medium uppercase overflow-hidden">
              {/* {selectedAvatar} */}
              {user?.image ? (
                <Image
                  src={user!.image!}
                  alt="userImage"
                  fill
                  className="object-cover"
                />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {avatarLetters.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSelectedAvatar(letter)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold uppercase transition ${
                    selectedAvatar === letter
                      ? "bg-[#4f57fd] text-white ring-2 ring-white/70"
                      : "bg-[#1d2246] text-white/80 hover:opacity-80"
                  }`}
                >
                  {letter}
                </button>
              ))}
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-white/30 text-white/70 transition hover:border-white"
              >
                <HiOutlinePlus className="h-5 w-5" />
              </button>
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
};

export default PersonalInfoSetting;
