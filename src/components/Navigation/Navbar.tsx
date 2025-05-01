import { userDetail } from "@/data/dummy/user.login";
import Hamburger from "./Hamburger";
import NavbarTitle from "./NavbarTitle";
import Profile from "./Profile";

export function Navbar() {
  const isLogin = true;
  const User = isLogin ? userDetail : null;

  return (
    <div className="bg-[#ad0a1f]">
      <div className="flex justify-between items-center  py-2 px-8 md:px-24 max-w-[1420px] mx-auto">
        <div className="flex items-center gap-2 ">
          <Hamburger userDetail={User} />
          <NavbarTitle />
        </div>
        <Profile userDetail={User} />
      </div>
    </div>
  );
}
