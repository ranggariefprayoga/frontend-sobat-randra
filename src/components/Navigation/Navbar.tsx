"use client";

import LoadingComponent from "../LoadingComponent/LoadingComponent";
import Hamburger from "./Hamburger";
import NavbarTitle from "./NavbarTitle";
import Profile from "./Profile";
import { useUser } from "@/lib/api/user.api";

export function Navbar() {
  const { data, isLoading, error } = useUser();

  if (isLoading) {
    return <LoadingComponent />;
  }

  console.log(error);

  // console.log(data);

  return (
    <div className="bg-[#ad0a1f]">
      <div className="flex justify-between items-center  py-2 px-8 md:px-24 max-w-[1420px] mx-auto">
        <div className="flex items-center gap-2 ">
          <Hamburger userDetail={data?.data} />
          <NavbarTitle />
        </div>
        <Profile userDetail={data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
}
