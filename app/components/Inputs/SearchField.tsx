"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

type SearchFieldProps = {
  placeholder: string;
  classname?: string;
  // defaultValue?: string;
};

const SearchField = ({
  placeholder,
  classname,
}: // defaultValue = "",
SearchFieldProps) => {
  const router = useRouter();
  // const params = useSearchParams();
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   setValue(defaultValue);
  // }, [defaultValue, params]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    const url = query ? `/search?q=${encodeURIComponent(query)}` : "/search";
    router.push(url);
  };

  return (
    <form
      className={`flex items-center w-full ${classname}`}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center w-full xl:w-xl mx-1 md:mx-5 lg:mx-auto bg-gray-100 rounded focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-400">
        <MagnifyingGlassIcon className="h-5 w-5 ml-3 my-auto text-gray-500 " />
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className=" w-full px-3 py-2 text-black outline-none placeholder:text-base placeholder:font-medium placeholder:text-gray-400"
        />
      </div>
    </form>
  );
};

export default SearchField;
