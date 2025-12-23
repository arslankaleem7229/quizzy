"use client";

import { useEffect } from "react";

export default function ConfettiOnMount() {
  useEffect(() => {
    if (!window.confetti) return;

    window.confetti({
      angle: 145,
      origin: { y: 0.25, x: 0.75 },
      particleCount: 250,
      spread: 70,
    });

    return () => {
      window.confetti.reset();
    };
  }, []);

  return null;
}
