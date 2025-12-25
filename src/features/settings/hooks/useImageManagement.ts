"use client";
import { useState, useCallback } from "react";
import { UseImageManagementReturn } from "../types";
import {
  initializeAvailableImages,
  updateAvailableImagesOnChange,
} from "../utils/imageManagement";

export function useImageManagement(
  initialImage: string | null,
  userImages: string[]
): UseImageManagementReturn {
  const [currentImage, setCurrentImage] = useState(initialImage);
  const [availableImages, setAvailableImages] = useState<string[]>(() =>
    initializeAvailableImages(initialImage, userImages)
  );

  const updateCurrentImage = useCallback((nextImage: string | null) => {
    setCurrentImage((prevCurrent) => {
      setAvailableImages((prevAvailable) =>
        updateAvailableImagesOnChange(prevAvailable, prevCurrent, nextImage)
      );
      return nextImage;
    });
  }, []);

  const resetImages = useCallback(
    (userImage: string | null, newUserImages: string[]) => {
      setCurrentImage(userImage);
      setAvailableImages(initializeAvailableImages(userImage, newUserImages));
    },
    []
  );

  return {
    currentImage,
    availableImages,
    updateCurrentImage,
    resetImages,
  };
}
