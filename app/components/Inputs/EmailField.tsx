import React from "react";

const EmailField = ({
  placeholder,
  label,
}: {
  placeholder: string;
  label?: string;
}) => {
  return (
    <>
      <label
        htmlFor={`${label ?? "email"}`}
        className="text-sm font-semibold text-gray-500"
      >
        {label ?? "Email"}
      </label>
      <div className="flex-1 py-2 flex justify-center">
        <div className="w-full flex bg-gray-100 rounded ">
          <input
            type="email"
            id={`${label ?? "email"}`}
            name={`${label ?? "email"}`}
            placeholder={placeholder}
            className="email-input w-full px-3 py-4 rounded text-black outline-none placeholder:text-base placeholder:font-medium placeholder:text-gray-400 placeholder:tracking-wider"
          />
        </div>
      </div>
    </>
  );
};

export default EmailField;
