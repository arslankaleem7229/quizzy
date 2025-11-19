"use client";

import { useSession } from "next-auth/react";

const NavbarUpgradeButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading" || !session) {
    return null;
  }

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ffcd1f] text-[#0b1034] font-semibold text-sm shadow-lg hover:brightness-95 transition-all border border-[#f7d878]"
    >
      Upgrade: Free 7-day trial
    </button>
  );
};

export default NavbarUpgradeButton;
