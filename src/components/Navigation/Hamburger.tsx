/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Edit, Key, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import NoAuthNavbarComponent from "./NoAuthNavbar";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { BookOpen, ClipboardList, HelpCircle, Home, MessageSquare, Package, TrendingUp, User } from "lucide-react";
import { UserDetailInterface } from "@/model/user.model";
import { useLogout } from "@/lib/api/user.api";
import { toast } from "sonner";

export default function Hamburger({ userDetail }: { userDetail: UserDetailInterface }) {
  console.log(userDetail);

  const router = useRouter();
  const logoutMutation = useLogout();
  const idUser = userDetail?.id;

  const handleLogout = async () => {
    try {
      if (idUser) {
        await logoutMutation.mutateAsync(String(idUser));
      }
      toast.success("Logout berhasil! Dadahh 👋");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Logout gagal! Coba lagi.");
    }
  };

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
              <img src="/logo/logo.png" alt="Sobat Randra Logo" className="w-8 h-8 md:w-14 md:h-14 object-contain" />
              <div>
                <SheetTitle className="text-[#ad0a1f] font-semibold text-lg md:text-xl">Sobat Randra</SheetTitle>
                <SheetDescription className="text-xs md:text-sm text-gray-600">All in one Platform belajar SKD CPNS, BUMN, dan Polri</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <SheetClose asChild>
            {userDetail?.role === "Admin" ? (
              <Command>
                <CommandList>
                  <CommandGroup heading="Layanan">
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/layanan/tryout")}>
                        <BookOpen size={18} />
                        <span>Buat & Update Try Out</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/layanan/bimbel")}>
                        <ClipboardList size={18} />
                        <span>Buat & Update Bimbel</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/layanan/smartbook")}>
                        <Package size={18} />
                        <span>Buat & Update SmartBook</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/layanan/video")}>
                        <TrendingUp size={18} />
                        <span>Buat & Update Video Belajar</span>
                      </Button>
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Try Out">
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/tryout/buat-soal")}>
                        <Edit size={18} />
                        <span>Buat Soal Try Out</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/tryout/akses")}>
                        <Key size={18} />
                        <span>Tambahkan Akses Try Out</span>
                      </Button>
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Bimbel">
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/bimbel/bareng")}>
                        <Key size={18} />
                        <span>Tambahkan Akses Bimbel Bareng</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/bimbel/private")}>
                        <Key size={18} />
                        <span>Tambahkan Akses Bimbel Private</span>
                      </Button>
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Smartbook & Video Belajar">
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/mayar")}>
                        <Edit size={18} />
                        <span>Push Layanan Smartbook & Video Belajar</span>
                      </Button>
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Pelanggan">
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/pelanggan/user")}>
                        <User size={18} />
                        <span>Daftar User</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/admin/pelanggan/kritik-saran")}>
                        <MessageSquare size={18} />
                        <span>Daftar Kritik dan Saran</span>
                      </Button>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            ) : (
              <Command>
                <CommandList>
                  <CommandGroup heading="Menu Utama">
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start " onClick={() => navigateTo("/")}>
                        <Home size={18} />
                        <span>Beranda</span>
                      </Button>
                    </CommandItem>

                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/pilihan-paket")}>
                        <Package size={18} />
                        <span>Pilihan Paket Belajar</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/mulai-belajar")}>
                        <BookOpen size={18} />
                        <span>Mulai Belajar</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/history-nilai")}>
                        <ClipboardList size={18} />
                        <span>History Nilai Saya</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/rangking-nasional")}>
                        <TrendingUp size={18} />
                        <span>Rangking Nasional TO</span>
                      </Button>
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Akun Saya">
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/profile")}>
                        <User size={18} />
                        <span>Profile Saya</span>
                      </Button>
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Lainnya">
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/kritik-saran")}>
                        <MessageSquare size={18} />
                        <span>Kritik & Saran</span>
                      </Button>
                    </CommandItem>
                    <CommandItem>
                      <Button variant="ghost" className="w-full flex justify-start" onClick={() => (window.location.href = "https://wa.me/6287747867857")}>
                        <HelpCircle size={18} />
                        <span>Bantuan</span>
                      </Button>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
          </SheetClose>

          <SheetFooter>
            {userDetail ? (
              <div className="bg-[#ad0a1f] text-white rounded-lg p-2 flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Avatar className="text-gray-700">
                    <AvatarFallback>{userDetail.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm md:text-base">{userDetail.name}</div>
                    <div className="text-xs md:text-sm opacity-80">{userDetail.email}</div>
                  </div>
                </div>
                <SheetClose asChild>
                  <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-black">
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
                    <NoAuthNavbarComponent />
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
