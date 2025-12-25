"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const NavbarCreateButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return (
      <Link href="/create" className="btn-text text-xs w-22 md:text-sm md:w-24">
        + Create
      </Link>
    );
  }

  return (
    <Link
      href={"/create"}
      className="btn-primary p-1.5 h-11 w-11 flex items-center justify-center "
    >
      <FaPlus />
    </Link>
  );
};

export default NavbarCreateButton;
