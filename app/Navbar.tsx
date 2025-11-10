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
      <header className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-3 sticky top-0 left-0 right-0 h-28 md:h-16 items-center px-2 md:px-4 bg-white">
        <div className="grid grid-cols-4 md:grid-cols-3 items-center shrink-0">
          <Logo classname="col-span-1" />
          <div className="col-span-3 md:col-span-2 grid grid-cols-2 justify-self-start ">
            <button className=" btn-text hidden sm:block">Study tools</button>
            <button className=" btn-text hidden sm:block">Subject areas</button>
          </div>
        </div>

        <SearchField
          classname="hidden md:block"
          placeholder="Find it faster with a search"
        />

        <div className="grid grid-cols-2 items-center gap-x-10 mx-5 shrink-0 justify-self-end">
          <button className="btn-text text-sm w-22 md:text-base md:w-24">
            Create +
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="btn-primary w-20"
          >
            Login
          </button>
        </div>

        <SearchField
          classname="block md:hidden col-span-2 mx-1 md:mx-4 "
          placeholder="Find it faster with a search"
        />
      </header>

      {showLogin && <Onboarding onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;

{
  /* <h1 className="flex justify-center items-center ">
          <span className="font-semibold text-7xl text-cyan-200  pl-2 py-1">
            Quizzy
          </span>
          {/* <span className="font-bold text-3xl pr-2 py-1">uizzy</span> 
        </h1> */
  /* <Image
          src={quizzy}
          className="flex justify-center items-center"
          alt="Quizzy Logo"
        /> */
}
