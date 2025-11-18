import React from "react";

const EmailField = ({
  placeholder,
  label,
  name,
  type = "email",
}: {
  placeholder: string;
  label?: string;
  name?: string;
  type?: "email" | "text";
}) => {
  const fieldName = name ?? label ?? "email";
  const displayLabel = label ?? "Email";

  return (
    <>
      <label
        htmlFor={fieldName}
        className="text-sm font-semibold text-gray-500"
      >
        {displayLabel}
      </label>
      <div className="flex-1 py-2 flex justify-center">
        <div className="w-full flex bg-gray-100 rounded ">
          <input
            type={type}
            id={fieldName}
            name={fieldName}
            placeholder={placeholder}
            className="email-input w-full px-3 py-4 rounded text-black outline-none placeholder:text-base placeholder:font-medium placeholder:text-gray-400 placeholder:tracking-wider"
          />
        </div>
      </div>
    </>
  );
};

export default EmailField;
