"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export default function NavbarSection() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <>
      <Navbar />
    </>
  );
}
