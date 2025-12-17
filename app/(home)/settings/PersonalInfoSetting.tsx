"use client";
import SettingEditButtonRow from "./components/SettingEditButtonRow";
import SettingDropDownRow from "./components/SettingDropDownRow";
import Image from "next/image";
import { HiOutlinePlus } from "react-icons/hi2";
import { avatars } from "./avatars";
import { UserWithPreferenceResponse } from "@/lib/types/api";
import { useState } from "react";
import { Spinner } from "@heroui/spinner";

type props = {
  userImage: string;
  images: string[];
  name: string;
};

export default function PersonalInfoSetting({
  userImage,
  name,
  images,
}: props) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(userImage);

  const [availableImages, setAvailableImages] = useState<string[]>(() => {
    const avatarImages = avatars.map((a) => a.image);
    const avatarSet = new Set(avatarImages);
    const imagesOnly = images.filter((img) => !avatarSet.has(img));
    return [...imagesOnly, ...avatarImages].filter(
      (img, i, arr) => img !== userImage && arr.indexOf(img) === i
    );
  });

  const updateCurrentImage = (nextImage: string) => {
    setCurrentImage((prevCurrent) => {
      setAvailableImages((prevAvailable) => {
        const updated = prevAvailable.filter(
          (img) => img !== nextImage && img !== prevCurrent
        );
        if (prevCurrent && prevCurrent !== nextImage) {
          const avatarImages = avatars.map((a) => a.image);
          const avatarSet = new Set(avatarImages);
          if (avatarSet.has(prevCurrent)) {
            const avatarIndex = avatarImages.indexOf(prevCurrent);
            const insertIndex = updated.findIndex((img) => {
              const imgIndex = avatarImages.indexOf(img);
              return imgIndex !== -1 && imgIndex > avatarIndex;
            });
            if (insertIndex === -1) {
              updated.push(prevCurrent);
            } else {
              updated.splice(insertIndex, 0, prevCurrent);
            }
          } else {
            updated.unshift(prevCurrent);
          }
        }
        return updated;
      });
      return nextImage;
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }

      const result: UserWithPreferenceResponse = await res.json();
      if (result.success) {
        updateCurrentImage(result.data.image ?? currentImage);
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (url: string) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        body: JSON.stringify({ url: url }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const result: UserWithPreferenceResponse = await res.json();
      if (result.success) {
        updateCurrentImage(result.data.image ?? url);
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
                name.charAt(0).toUpperCase()
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
