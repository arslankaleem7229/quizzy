import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const PasswordField = ({ placeholder }: { placeholder: string }) => {
  const [isHidden, setHidden] = useState(true);
  return (
    <div className="flex-1 py-2 flex justify-center">
      <div className="relative w-full">
        <input
          type={!isHidden ? "text" : "password"}
          id="password"
          name="password"
          placeholder={placeholder}
          className="email-input w-full px-3 py-4 pr-15 bg-gray-100 rounded text-black outline-none placeholder:text-base placeholder:font-medium placeholder:text-gray-400 placeholder:tracking-wider"
        />
        <div className="" onClick={() => setHidden(!isHidden)}>
          {isHidden ? (
            <IoEyeOutline className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer" />
          ) : (
            <IoEyeOffOutline className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
