"use client";

import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Onboarding from "./components/Onboarding";

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
      <header className="sticky top-0 left-0 right-0 h-16 flex items-center px-4 bg-white">
        <div className="flex items-center space-x-3 shrink-0 ">
          <Logo />
          <button className="btn-text ">Study tools</button>
          <button className="btn-text ">Subject areas</button>
        </div>

        <SearchField placeholder="Find it faster with a search" />

        <div className="flex items-center space-x-5 mx-5 shrink-0">
          <button className="btn-text text-base">Create +</button>
          <button onClick={() => setShowLogin(true)} className="btn-primary">
            Login
          </button>
        </div>
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
