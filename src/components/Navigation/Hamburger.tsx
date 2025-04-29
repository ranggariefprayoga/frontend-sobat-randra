import { Button } from "@/components/ui/button";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { BookOpen, ClipboardList, HelpCircle, Home, LogOut, Menu, MessageSquare, Package, TrendingUp, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Hamburger() {
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
              <img src="/logo/logo.png" alt="Sobat Randra Logo" className="w-10 h-10 object-contain" />
              <div>
                <SheetTitle className="text-[#ad0a1f] font-semibold text-xl">Sobat Randra</SheetTitle>
                <SheetDescription className="text-sm text-gray-600">All in one Platform belajar SKD CPNS, BUMN, dan Polri</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <>
            <Command>
              <CommandList>
                <CommandGroup heading="Menu Utama">
                  <CommandItem>
                    <Home />
                    <span>Beranda</span>
                  </CommandItem>
                  <CommandItem>
                    <Package />
                    <span>Pilihan Paket Belajar</span>
                  </CommandItem>
                  <CommandItem>
                    <BookOpen />
                    <span>Mulai Belajar</span>
                  </CommandItem>
                  <CommandItem>
                    <ClipboardList />
                    <span>History Nilai Saya</span>
                  </CommandItem>
                  <CommandItem>
                    <TrendingUp />
                    <span>Rangking Nasional TO</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Akun Saya">
                  <CommandItem>
                    <User />
                    <span>Profile Saya</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Lainnya">
                  <CommandItem>
                    <MessageSquare />
                    <span>Kritik & Saran</span>
                  </CommandItem>
                  <CommandItem>
                    <HelpCircle />
                    <span>Bantuan</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </>
          <SheetFooter>
            <div className="bg-[#ad0a1f] text-white rounded-lg px-6 py-4 flex flex-col items-center gap-4">
              <div className="flex gap-4 items-center">
                <Avatar className="text-gray-700">
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">Rangga Arief Prayoga</div>
                  <div className="text-sm opacity-80">ranggaariefprayogaa@gmail.com</div>
                </div>
              </div>
              <SheetClose asChild>
                <Button type="submit" className="flex items-center gap-2">
                  <LogOut size={18} />
                  Log Out
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
