import Logo from "./components/Logo";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const Navbar = () => {
  return (
    <header className="sticky top-0 left-0 right-0 h-16 flex items-center px-4 bg-white">
      <div className="flex items-center space-x-3 shrink-0 ">
        <Logo />
        <button className="btn-text ">Study tools</button>
        <button className="btn-text ">Subject areas</button>
      </div>

      <div className="flex-1 mx-4 flex justify-center">
        <div className="w-1/2 flex mx-5 bg-gray-100 rounded focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-400">
          <MagnifyingGlassIcon className="h-5 w-5 ml-3 my-auto text-gray-700 " />
          <input
            type="text"
            placeholder="Find it faster with a search"
            className="w-full px-3  py-2  text-black outline-none placeholder:text-base, font-medium"
          />
        </div>
      </div>

      <div className="flex items-center space-x-5 mx-5 shrink-0">
        <button className="btn-text text-base">Create +</button>
        <button className="btn-primary">Login</button>
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
