"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
          className="absolute right-0 mt-3 w-80 rounded-2xl border border-(--foreground)/20 bg-(--background) shadow-2xl overflow-hidden z-50"
          role="menu"
        >
          <div className="px-4 py-3 flex items-center gap-3 border-b border-(--foreground)/20">
            <div className="relative h-12 w-12 rounded-full flex items-center justify-center overflow-hidden text-lg font-semibold">
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
              <span className="text-sm font-semibold text-(--textColor)">
                {user.name}
              </span>
              <span className="text-xs text-gray-300">{user.email}</span>
            </div>
          </div>

          <nav className="flex flex-col text-sm">
            <NavBarDropDownButton
              label={"Achievements"}
              onclick={closeDropdown}
            >
              <FaTrophy className="text-lg " />
            </NavBarDropDownButton>
            <Link href={"/settings"}>
              <NavBarDropDownButton label={"Settings"} onclick={closeDropdown}>
                <FiSettings className="text-lg" />
              </NavBarDropDownButton>
            </Link>
            <NavBarDropDownButton
              label={isLightMode ? "Dark mode" : "Light mode"}
              onclick={toggleTheme}
            >
              {isLightMode ? (
                <FiMoon className="text-lg" />
              ) : (
                <FiSun className="text-lg" />
              )}
            </NavBarDropDownButton>

            <div className="border-t border-(--foreground)/20" />

            <NavBarDropDownButton
              label={"Log out"}
              onclick={() => {
                closeDropdown();
                signOut({ callbackUrl: "/" });
              }}
            >
              <RiLogoutBoxLine className="text-lg" />
            </NavBarDropDownButton>

            <div className="border-t border-(--foreground)/20" />

            <NavBarDropDownButton
              label={"Privacy policy"}
              onclick={closeDropdown}
            >
              <MdOutlinePrivacyTip className="text-lg" />
            </NavBarDropDownButton>

            <NavBarDropDownButton
              label={"Help and feedback"}
              onclick={closeDropdown}
            >
              <MdOutlineFeedback className="text-lg" />
            </NavBarDropDownButton>

            <Link href={"/payment"} className="flex max-w-full">
              <NavBarDropDownButton label={"Upgrade"} onclick={closeDropdown}>
                <BsStars className="text-lg text-[#f4c64e]" />
              </NavBarDropDownButton>
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
};

const NavBarDropDownButton = ({
  label,
  onclick,
  children,
}: {
  label: string;
  onclick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) => {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-(--textColor) hover:bg-(--foreground)/10 transition-colors"
      onClick={onclick}
    >
      {children}
      <span>{label}</span>
    </button>
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
