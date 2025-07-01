"use client";

import LoadingComponent from "../LoadingComponent/LoadingComponent";
import Hamburger from "./Hamburger";
import NavbarTitle from "./NavbarTitle";
import Profile from "./Profile";
import { useUser } from "@/lib/api/user.api";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { data, isLoading } = useUser();
  const pathname = usePathname();

  // Corrected: Check if the current path starts with '/quiz' or '/free-quiz'
  const isQuizPage = pathname?.startsWith("/quiz") || pathname?.startsWith("/free-quiz");

  // If on the '/quiz' or '/free-quiz' page, return null
  if (isQuizPage) {
    return null;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="bg-white text-black z-50">
      <div className="flex justify-between items-center py-2 px-4 md:px-24 max-w-[1420px] mx-auto">
        <div className="flex items-center gap-2 ">
          <Hamburger userDetail={data?.data} />
          <NavbarTitle />
        </div>
        <Profile userDetail={data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
}
