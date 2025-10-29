import Image from "next/image";
import React from "react";
import quizzy from "../public/Quizzy.svg";
import Logo from "./components/Logo";

const Navbar = () => {
  return (
    <header className="sticky top-0 left-0 right-0 h-16 flex items-center px-4 bg-white">
      <div className="flex items-center space-x-3 shrink-0 ">
        <Logo />
        <button className="btn-text ">Study tools</button>
        <button className="btn-text ">Subject areas</button>
      </div>

      <div className="flex-1 mx-4 flex justify-center">
        <input
          type="text"
          placeholder="Find it faster with a search"
          className="w-1/2  px-3  py-2 rounded focus:outline-none text-black bg-gray-100 placeholder:text-base, font-medium"
        />
      </div>

      <div className="flex items-center space-x-3 shrink-0">
        <button className="btn-text">Button</button>
        <button className="btn-primary">Button 5</button>
      </div>
    </header>
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
