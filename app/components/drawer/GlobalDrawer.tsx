"use client";

import { useDrawer } from "@/app/providers/DrawerProvider";
import { FramerDrawer } from "./FramerDrawer";

export function GlobalDrawer() {
  const { isOpen, content, title, closeDrawer } = useDrawer();

  return (
    <FramerDrawer isOpen={isOpen} onClose={closeDrawer} title={title}>
      {content}
    </FramerDrawer>
  );
}
