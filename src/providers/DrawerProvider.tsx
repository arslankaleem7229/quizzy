"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DrawerContextType {
  isOpen: boolean;
  content: ReactNode | null;
  openDrawer: (content: ReactNode, title?: string) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openDrawer = (content: ReactNode) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setTimeout(() => {
      setContent(null);
    }, 200);
  };

  return (
    <DrawerContext.Provider
      value={{ isOpen, content, openDrawer, closeDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within DrawerProvider");
  }
  return context;
}
