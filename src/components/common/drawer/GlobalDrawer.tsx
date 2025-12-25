"use client";

import { useDrawer } from "@/providers/DrawerProvider";
import { FramerDrawer } from "./FramerDrawer";

export function GlobalDrawer() {
  const { isOpen, content, closeDrawer } = useDrawer();

  return (
    <FramerDrawer isOpen={isOpen} onClose={closeDrawer}>
      {content}
    </FramerDrawer>
  );
}
