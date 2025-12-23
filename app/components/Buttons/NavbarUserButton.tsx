import Link from "next/link";
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
import { CustomDropdown } from "../dropdown/CustomDropdown";

const NavbarUserButtonContent = ({ user }: { user: User }) => {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) return null;

  const isLightMode = resolvedTheme === "light";

  if (!user) {
    return (
      <Link href="/login">
        <button className="btn-primary w-20 text-sm">Login</button>
      </Link>
    );
  }

  return (
    <CustomDropdown
      trigger={({ ref, onClick, isOpen }) => (
        <button
          ref={ref}
          onClick={onClick}
          className="relative btn-primary h-11 w-11 rounded-full flex items-center justify-center overflow-hidden"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "user"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </span>
          )}
        </button>
      )}
    >
      {({ close }) => (
        <div
          className="w-80 rounded-2xl border border-(--foreground)/20 bg-(--background) shadow-2xl overflow-hidden"
          onClick={close}
        >
          <UserHeader user={user} />

          <nav className="flex flex-col text-sm">
            <DropdownButton label="Achievements">
              <FaTrophy className="text-lg" />
            </DropdownButton>

            <Link href="/settings">
              <DropdownButton label="Settings">
                <FiSettings className="text-lg" />
              </DropdownButton>
            </Link>

            <DropdownButton
              label={isLightMode ? "Dark mode" : "Light mode"}
              onClick={() => setTheme(isLightMode ? "dark" : "light")}
            >
              {isLightMode ? (
                <FiMoon className="text-lg" />
              ) : (
                <FiSun className="text-lg" />
              )}
            </DropdownButton>

            <Divider />

            <DropdownButton
              label="Log out"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <RiLogoutBoxLine className="text-lg" />
            </DropdownButton>

            <Divider />

            <DropdownButton label="Privacy policy">
              <MdOutlinePrivacyTip className="text-lg" />
            </DropdownButton>

            <DropdownButton label="Help and feedback">
              <MdOutlineFeedback className="text-lg" />
            </DropdownButton>

            <Link href="/payment">
              <DropdownButton label="Upgrade">
                <BsStars className="text-lg text-[#f4c64e]" />
              </DropdownButton>
            </Link>
          </nav>
        </div>
      )}
    </CustomDropdown>
  );
};

const Divider = () => <div className="border-t border-(--foreground)/20" />;

const UserHeader = ({ user }: { user: User }) => (
  <div className="px-4 py-3 flex items-center gap-3 border-b border-(--foreground)/20">
    <div className="relative h-12 w-12 rounded-full overflow-hidden">
      {user.image ? (
        <Image src={user.image} alt={user.name ?? "user"} fill />
      ) : (
        <span>{user.name?.charAt(0)?.toUpperCase() ?? "U"}</span>
      )}
    </div>
    <div className="flex flex-col">
      <span className="text-sm text-(--textColor) font-semibold">
        {user.name}
      </span>
      <span className="text-xs text-gray-300">{user.email}</span>
    </div>
  </div>
);

const DropdownButton = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-(--textColor) hover:bg-(--foreground)/10 transition-colors"
  >
    {children}
    <span>{label}</span>
  </button>
);

export default NavbarUserButtonContent;
