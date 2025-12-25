"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const NavbarUpgradeButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading" || !session) {
    return null;
  }

  return (
    <Link
      href={"/payment"}
      type="button"
      className="hidden xl:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ffcd1f] text-[#0b1034] font-semibold text-sm shadow-lg hover:brightness-95 transition-all border border-[#f7d878]"
    >
      Upgrade: Free 7-day trial
    </Link>
  );
};

export default NavbarUpgradeButton;
