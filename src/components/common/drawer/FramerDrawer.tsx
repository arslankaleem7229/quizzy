"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import EmailField from "../inputs/EmailField";

interface FramerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function FramerDrawer({ isOpen, onClose, children }: FramerDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 md:hidden"
          >
            <div className="bg-(--background) rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-(--grayText) rounded-full" />
              </div>

              <div className="flex-1 overflow-y-scroll px-6 py-4">
                {children}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-(--background) rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
