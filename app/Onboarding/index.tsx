"use client";

import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import BgImage from "../../public/signup-bg-image.png";
import UnderlineImage from "../../public/underline-svg.svg";
import LoginPage from "./Login";
import SignupPage from "./Signup";

export default function Onboarding({ onClose }: { onClose: () => void }) {
  const [formType, setFormType] = useState<"login" | "signup">("login");

  return (
    <div className=" h-full w-full fixed inset-0 bg-black/50 flex items-center justify-center z-9999">
      <div className="h-full w-full bg-(--background) flex relative">
        <div className="relative hidden lg:block lg:shrink-0 w-0 lg:w-1/2 h-full ">
          <Image
            src={BgImage}
            alt="image"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-10 left-15 z-10 w-50 text-5xl xl:text-6xl 2xl:text-7xl font-bold text-black">
            <h1 className="w-full h-full">Dress casually, study seriously.</h1>
          </div>
          <h1 className="absolute bottom-10 left-15 z-10 text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">
            Quizzy.
          </h1>
        </div>

        <div className="flex-1 flex justify-center p-15  items-center h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex-1 flex-row  max-w-2xl h-full ">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 text-2xl text-gray-500 hover:text-gray-700"
            >
              <IoClose />
            </button>
            <div className="w-1/2 mt-5 ">
              <div className="relative flex justify-around ">
                <button
                  className="text-xl font-semibold transition-colors tracking-wider"
                  onClick={() => setFormType("signup")}
                >
                  Signup
                </button>
                <button
                  className="text-xl font-semibold transition-colors tracking-wider"
                  onClick={() => setFormType("login")}
                >
                  Login
                </button>
              </div>

              <div className="relative w-full pb-5 flex justify-center overflow-hidden">
                <div
                  className={`absolute top-0 transition-all duration-300 ease-in-out ${
                    formType === "signup" ? "left-1" : "left-1/2"
                  } w-1/2 flex justify-center`}
                >
                  <Image
                    className="object-contain"
                    src={UnderlineImage}
                    alt="underlineImage"
                  />
                </div>
              </div>
            </div>
            {formType === "login" ? <LoginPage /> : <SignupPage />}
          </div>
        </div>
      </div>
    </div>
  );
}

//  <form className="flex flex-col gap-3">
//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-2 rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-2 rounded"
//           />
//           <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
//             Log In
//           </button>
//         </form>
