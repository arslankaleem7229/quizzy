"use client";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { DrawerProvider } from "./DrawerProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <HeroUIProvider>
          <DrawerProvider>{children}</DrawerProvider>
        </HeroUIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
