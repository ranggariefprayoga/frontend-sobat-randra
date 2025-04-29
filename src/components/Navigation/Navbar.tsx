import Hamburger from "./Hamburger";
import NavbarTitle from "./NavbarTitle";
import Profile from "./Profile";

export function Navbar() {
  return (
    <div className="flex justify-between items-center bg-[#ad0a1f] py-2 px-8 md:px-28">
      <div className="flex items-center gap-2">
        <Hamburger />
        <NavbarTitle />
      </div>
      <Profile />
    </div>
  );
}
