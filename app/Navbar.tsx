"use client";
import Logo from "./components/Logo";
import SearchField from "./components/Inputs/SearchField";
import NavbarUserButton from "./components/Buttons/NavbarUserButton";
import NavbarCreateButton from "./components/Buttons/NavbarCreateButton";
import NavbarUpgradeButton from "./components/Buttons/NavbarUpgradeButton";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { User } from "next-auth";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = useMemo(() => session?.user as User, [session]);

  return (
    <>
      <header
        className={`flex flex-wrap md:flex-nowrap sticky top-0 left-0 right-0 h-28 md:h-16 items-center px-2 lg:px-4 ${
          status == "unauthenticated" ? "bg-white" : "bg-(--background)"
        } z-999`}
      >
        <div className="flex flex-1 md:flex-none shrink-0 gap-2 mr-4 xl:mr-0">
          <Logo />
          <div className="hidden lg:flex gap-2">
            <button className="btn-text">Study tools</button>
            <button className="btn-text">Subject areas</button>
          </div>
        </div>

        <SearchField
          classname="hidden md:block"
          placeholder="Find it faster with a search"
        />

        <div className="flex flex-none gap-x-6 items-center ml-10 lg:mx-5">
          <NavbarCreateButton />
          <NavbarUpgradeButton />
          <NavbarUserButton user={user} />
        </div>

        <SearchField
          classname="block md:hidden mx-1 md:mx-4 w-full md:mb-1"
          placeholder="Find it faster with a search"
        />
      </header>
    </>
  );
};

export default Navbar;
