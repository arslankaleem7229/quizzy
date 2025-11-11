import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const SearchField = ({
  placeholder,
  classname,
}: {
  placeholder: string;
  classname?: string;
}) => {
  return (
    <div className={`flex items-center w-full ${classname}`}>
      <div className="flex items-center justify-center w-full xl:w-xl mx-1 md:mx-5 lg:mx-auto bg-gray-100 rounded focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-400">
        <MagnifyingGlassIcon className="h-5 w-5 ml-3 my-auto text-gray-500 " />
        <input
          type="text"
          placeholder={placeholder}
          className=" w-full px-3 py-2 text-black outline-none placeholder:text-base placeholder:font-medium placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchField;
