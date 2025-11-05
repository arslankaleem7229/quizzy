import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const SearchField = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="flex-1 mx-4 flex justify-center">
      <div className="w-1/2 flex mx-5 bg-gray-100 rounded focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-400">
        <MagnifyingGlassIcon className="h-5 w-5 ml-3 my-auto text-gray-700 " />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-3  py-2  text-black outline-none placeholder:text-base, font-medium"
        />
      </div>
    </div>
  );
};

export default SearchField;
