import React from "react";

const EmailField = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="flex-1 py-2 flex justify-center">
      <div className="w-full flex bg-gray-100 rounded ">
        <input
          type="email"
          id="email"
          name="email"
          placeholder={placeholder}
          className="email-input w-full px-3 py-4 rounded text-black outline-none placeholder:text-base placeholder:font-medium placeholder:text-gray-400 placeholder:tracking-wider"
        />
      </div>
    </div>
  );
};

export default EmailField;
