"use client";
import { useState } from "react";
import { UpdateUserSettingsPayload } from "../types";
import { UserWithPreference } from "@/lib/types";
import { selectAvatarImage } from "../services/selectAvatar";
import { updateUserSettings } from "../services/updateUserSettings";
import { uploadProfilePicture } from "../services/uploadProfilePicture";
import { avatars } from "../data/avatars";
import { useDrawer } from "@/providers";
import { useSession } from "next-auth/react";

export function usePersonalInfoSettings(initialUser: UserWithPreference) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [error, setError] = useState<string | null | undefined>(null);

  const { openDrawer, closeDrawer } = useDrawer();

  const { update } = useSession();

  const { image, images } = currentUser;
  const userImage = image;
  const [currentImage, setCurrentImage] = useState(userImage);

  const [availableImages, setAvailableImages] = useState<string[]>(() => {
    const avatarImages = avatars.map((a) => a.image);
    const avatarSet = new Set(avatarImages);
    const imagesOnly = images.filter((img) => !avatarSet.has(img));
    return [...imagesOnly, ...avatarImages].filter(
      (img, i, arr) => img !== userImage && arr.indexOf(img) === i
    );
  });

  const updateCurrentImage = (nextImage: string | null) => {
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

  const handleUpdates = async (
    payload: UpdateUserSettingsPayload
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await updateUserSettings(payload);
      if (result.success) {
        setCurrentUser(result.user ?? initialUser);

        return true;
      } else {
        setError(result.error);
        throw new Error(result.error);
      }
    } catch (error) {
      setError(error?.toString());
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
      return false;
    }
  };

  const handleChange = async (file: File) => {
    if (!file) return;

    setIsLoading(true);
    try {
      const result = await uploadProfilePicture(file);
      if (result.success) {
        await update({ picture: result.user?.image ?? currentImage });

        updateCurrentImage(result.user?.image ?? currentImage);
      } else {
        throw new Error(result.error);
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
      const result = await selectAvatarImage(url);
      if (result.success) {
        updateCurrentImage(result.user?.image ?? url);
        await update({ picture: result.user?.image ?? url });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    currentUser,
    currentImage,
    availableImages,
    openDrawer,
    closeDrawer,
    handleChange,
    handleClick,
    handleUpdates,
  };
}
