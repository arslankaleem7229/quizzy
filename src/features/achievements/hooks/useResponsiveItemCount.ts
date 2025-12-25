import { useState, useEffect } from "react";

export function useResponsiveItemCount() {
  const [itemsToShow, setItemsToShow] = useState(6);

  useEffect(() => {
    const updateItemCount = () => {
      const width = window.innerWidth;
      if (width >= 1536) setItemsToShow(6);
      else if (width >= 1280) setItemsToShow(6);
      else if (width >= 1094) setItemsToShow(5);
      else if (width >= 925) setItemsToShow(4);
      else if (width >= 645) setItemsToShow(3);
      else setItemsToShow(2);
    };

    updateItemCount();
    window.addEventListener("resize", updateItemCount);
    return () => window.removeEventListener("resize", updateItemCount);
  }, []);

  return itemsToShow;
}
