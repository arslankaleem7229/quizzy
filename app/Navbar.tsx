import Logo from "./components/Logo";
import SearchField from "./components/Inputs/SearchField";
import Link from "next/link";

const Navbar = () => {
  // const { status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   const token = document.cookie.includes("token=");
  //   if (token) {
  //     router.replace("/latest");
  //   }
  // }, [router]);

  // const handleLoginClick = () => {
  //   if (status === "authenticated") {
  //     router.push("/latest");
  //   }
  //   return;
  // };

  return (
    <>
      <header className="flex flex-wrap md:flex-nowrap sticky top-0 left-0 right-0 h-28 md:h-16 items-center px-2 lg:px-4 bg-(--background) z-999">
        <div className="flex flex-1 md:flex-none shrink-0 gap-2 mr-4 xl:mr-0">
          <Logo />
          <div className="hidden lg:flex gap-2">
            <button className="btn-text">Study tools</button>
            <button className="btn-text">Subject areas</button>
          </div>
        </div>

        <SearchField
          classname="hidden md:block"
          placeholder="Find it faster with a search"
        />

        <div className="flex flex-none gap-x-5 items-center mx-5">
          <Link
            href="/latest"
            className="btn-text text-xs w-22 md:text-sm md:w-24"
          >
            + Create
          </Link>

          <Link href={"/latest"}>
            <button className="btn-primary w-20 text-sm">Login</button>
          </Link>
        </div>

        <SearchField
          classname="block md:hidden mx-1 md:mx-4 w-full md:mb-1"
          placeholder="Find it faster with a search"
        />
      </header>
    </>
  );
};

export default Navbar;
