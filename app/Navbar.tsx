"use client";

import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Onboarding from "./Onboarding";

import { usePathname } from "next/navigation";
import SearchField from "./components/Inputs/SearchField";

const Navbar = () => {
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setShowLogin(pathname === "/login");
  }, [pathname]);

  return (
    <>
      <header className="flex flex-wrap md:flex-nowrap sticky top-0 left-0 right-0 h-28 md:h-16 items-center px-2 lg:px-4 bg-white. z-9999999 bg-white">
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

        <div className="flex flex-none gap-x-5 items-center mx-5">
          <button className="btn-text text-xs w-22 md:text-sm md:w-24">
            + Create
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="btn-primary w-20 text-sm"
          >
            Login
          </button>
        </div>

        <SearchField
          classname="block md:hidden mx-1 md:mx-4 w-full md:mb-1"
          placeholder="Find it faster with a search"
        />
      </header>

      {showLogin && <Onboarding onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;
