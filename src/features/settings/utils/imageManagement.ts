import { avatars } from "../data/avatars";

export function initializeAvailableImages(
  userImage: string | null,
  userImages: string[]
): string[] {
  const avatarImages = avatars.map((a) => a.image);
  const avatarSet = new Set(avatarImages);
  const imagesOnly = userImages.filter((img) => !avatarSet.has(img));

  return [...imagesOnly, ...avatarImages].filter(
    (img, i, arr) => img !== userImage && arr.indexOf(img) === i
  );
}

export function updateAvailableImagesOnChange(
  prevAvailableImages: string[],
  prevCurrentImage: string | null,
  nextImage: string | null
): string[] {
  const updated = prevAvailableImages.filter(
    (img) => img !== nextImage && img !== prevCurrentImage
  );

  if (prevCurrentImage && prevCurrentImage !== nextImage) {
    const avatarImages = avatars.map((a) => a.image);
    const avatarSet = new Set(avatarImages);

    if (avatarSet.has(prevCurrentImage)) {
      const avatarIndex = avatarImages.indexOf(prevCurrentImage);
      const insertIndex = updated.findIndex((img) => {
        const imgIndex = avatarImages.indexOf(img);
        return imgIndex !== -1 && imgIndex > avatarIndex;
      });

      if (insertIndex === -1) {
        updated.push(prevCurrentImage);
      } else {
        updated.splice(insertIndex, 0, prevCurrentImage);
      }
    } else {
      updated.unshift(prevCurrentImage);
    }
  }

  return updated;
}
