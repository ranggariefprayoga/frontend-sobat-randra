"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { BookOpen, ClipboardList, HelpCircle, Home, LogOut, Menu, MessageSquare, Package, TrendingUp, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { userDetailInterface } from "@/model/user.model";

export default function Hamburger({ userDetail }: { userDetail: userDetailInterface | null }) {
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 px-4 py-2 rounded-md">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <div className="flex items-center gap-2">
              <img src="/logo/logo.png" alt="Sobat Randra Logo" className="w-14 h-14 object-contain" />
              <div>
                <SheetTitle className="text-[#ad0a1f] font-semibold text-xl">Sobat Randra</SheetTitle>
                <SheetDescription className="text-sm text-gray-600">All in one Platform belajar SKD CPNS, BUMN, dan Polri</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <Command>
            <CommandList>
              <CommandGroup heading="Menu Utama">
                <CommandItem onClick={() => navigateTo("/")}>
                  <Home size={18} />
                  <span>Beranda</span>
                </CommandItem>
                <CommandItem onClick={() => navigateTo("/pilihan-paket")}>
                  <Package size={18} />
                  <span>Pilihan Paket Belajar</span>
                </CommandItem>
                <CommandItem onClick={() => navigateTo("/mulai-belajar")}>
                  <BookOpen size={18} />
                  <span>Mulai Belajar</span>
                </CommandItem>
                <CommandItem onClick={() => navigateTo("/history-nilai")}>
                  <ClipboardList size={18} />
                  <span>History Nilai Saya</span>
                </CommandItem>
                <CommandItem onClick={() => navigateTo("/rangking-nasional")}>
                  <TrendingUp size={18} />
                  <span>Rangking Nasional TO</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Akun Saya">
                <CommandItem onClick={() => navigateTo("/profile")}>
                  <User size={18} />
                  <span>Profile Saya</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Lainnya">
                <CommandItem onClick={() => navigateTo("/kritik-saran")}>
                  <MessageSquare size={18} />
                  <span>Kritik & Saran</span>
                </CommandItem>
                <CommandItem onClick={() => (window.location.href = "https://wa.me/6287747867857")}>
                  <HelpCircle size={18} />
                  <span>Bantuan</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>

          <SheetFooter>
            {userDetail ? (
              <div className="bg-[#ad0a1f] text-white rounded-lg p-2 flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Avatar className="text-gray-700">
                    <AvatarFallback>{userDetail.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-base">{userDetail.name}</div>
                    <div className="text-sm opacity-80">{userDetail.email}</div>
                  </div>
                </div>
                <SheetClose asChild>
                  <Button variant="outline" type="submit" className="flex items-center gap-2 text-black">
                    <LogOut size={18} />
                    Log Out
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <>
                <div className="bg-[#ad0a1f] text-white rounded-lg p-2 flex items-center gap-2">
                  <img src="/logo/logo-bg.jpg" alt="logo" className="w-14 h-14 object-contain rounded-lg" />
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="ghost" className="rounded-full bg-[#D94B6B] text-white hover:bg-[#C75C71]" onClick={() => navigateTo("/auth/register")}>
                      Daftar
                    </Button>
                    <Button variant="ghost" className="rounded-full bg-[#FFA500] text-black hover:bg-[#FF8C00]" onClick={() => navigateTo("/auth/login")}>
                      Masuk
                    </Button>
                  </div>
                </div>
              </>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
