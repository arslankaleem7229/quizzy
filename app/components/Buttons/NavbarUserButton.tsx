"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FaTrophy } from "react-icons/fa";
import { FiMoon, FiSettings, FiSun } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlinePrivacyTip, MdOutlineFeedback } from "react-icons/md";
import { BsStars } from "react-icons/bs";

import { useTheme } from "next-themes";
import { User } from "next-auth";
import { useMounted } from "@/app/hooks/useMounted";

const NavbarUserButtonContent = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { resolvedTheme, setTheme } = useTheme();
  const closeDropdown = () => setIsOpen(false);

  const currentTheme =
    resolvedTheme && (resolvedTheme === "light" || resolvedTheme === "dark")
      ? resolvedTheme
      : "dark";

  const isLightMode = currentTheme === "light";

  const toggleTheme = () => setTheme(isLightMode ? "dark" : "light");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const mounted = useMounted();

  if (!mounted) return null;

  if (status === "loading") {
    return null;
  }

  if (!user) {
    return (
      <Link href="/login">
        <button className="btn-primary w-20 text-sm">Login</button>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn-primary relative h-11 w-11 rounded-full flex items-center justify-center overflow-hidden"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {user?.image ? (
          <Image
            className="object-cover"
            src={user.image}
            alt={user?.name ?? "userImage"}
            fill
          />
        ) : (
          <span className="font-semibold">
            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
          </span>
        )}
      </button>

      {isOpen ? (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-80 rounded-2xl border border-[#2e3356] bg-[#0c133d] shadow-2xl overflow-hidden z-50"
          role="menu"
        >
          <div className="px-4 py-3 flex items-center gap-3 border-b border-[#2e3356]">
            <div className="relative h-12 w-12 rounded-full bg-[#3c4796] flex items-center justify-center overflow-hidden text-lg font-semibold">
              {user?.image ? (
                <Image
                  className="object-cover"
                  src={user.image}
                  alt={user?.name ?? "userImage"}
                  fill
                />
              ) : (
                <span>{user.name?.charAt(0)?.toUpperCase() ?? "U"}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{user.name}</span>
              <span className="text-xs text-gray-300">{user.email}</span>
            </div>
          </div>

          <nav className="flex flex-col text-sm">
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#151c4b] transition-colors"
              onClick={closeDropdown}
            >
              <FaTrophy className="text-lg " />
              <span>Achievements</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#151c4b] transition-colors"
              onClick={closeDropdown}
            >
              <FiSettings className="text-lg" />
              <span>Settings</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#151c4b] transition-colors"
              onClick={toggleTheme}
            >
              {isLightMode ? (
                <FiMoon className="text-lg" />
              ) : (
                <FiSun className="text-lg" />
              )}
              <span>{isLightMode ? "Dark mode" : "Light mode"}</span>
            </button>
          </nav>

          <div className="border-t border-[#2e3356]" />

          <button
            type="button"
            onClick={() => {
              closeDropdown();
              signOut({ callbackUrl: "/" });
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#151c4b] transition-colors"
          >
            <RiLogoutBoxLine className="text-lg" />
            <span>Log out</span>
          </button>

          <div className="border-t border-[#2e3356]" />

          <nav className="flex flex-col text-sm">
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#151c4b] transition-colors"
              onClick={closeDropdown}
            >
              <MdOutlinePrivacyTip className="text-lg" />
              <span>Privacy policy</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#151c4b] transition-colors"
              onClick={closeDropdown}
            >
              <MdOutlineFeedback className="text-lg" />
              <span>Help and feedback</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#151c4b] transition-colors"
              onClick={closeDropdown}
            >
              <BsStars className="text-lg text-[#f4c64e]" />
              <span>Upgrade</span>
            </button>
          </nav>
        </div>
      ) : null}
    </div>
  );
};

// const NavbarUserButton = () => {
//   return (
//     <ThemeProvider
//       attribute="data-theme"
//       defaultTheme="dark"
//       enableSystem={false}
//       disableTransitionOnChange
//     >
//       <NavbarUserButtonContent />
//     </ThemeProvider>
//   );
// };

export default NavbarUserButtonContent;
