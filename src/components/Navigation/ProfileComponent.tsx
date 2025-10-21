/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getFirstName } from "@/utils/getFirstName";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { UserDetailInterface } from "@/model/user.model";
import { useRouter } from "next/navigation";
import { useLogout } from "@/lib/api/user.api";
import { toast } from "sonner";

export default function ProfileComponent({ userDetail }: { userDetail: UserDetailInterface | null }) {
  const router = useRouter();
  const logoutMutation = useLogout();
  const idUser = userDetail?.id;
  const navigateTo = (url: string) => {
    router.push(url);
  };

  const handleLogout = async () => {
    try {
      if (idUser) {
        await logoutMutation.mutateAsync(String(idUser));
        toast.success("Logout berhasil! Dadahh 👋");
        window.location.assign("/auth/login");
      }
    } catch (err) {
      toast.error("Logout gagal! Coba lagi.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {userDetail && (
            <Button variant="destructive" className="flex items-center gap-2 font-bold bg-red-700 text-white">
              <User size={18} strokeWidth={3} stroke="white" />
              <span className="text-base hidden sm:block">{getFirstName(userDetail.name)}</span>
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Button variant="ghost" className="w-full flex justify-start" onClick={() => navigateTo("/profile")}>
              <DropdownMenuItem>
                <User size={18} />
                <span>Profile Saya</span>
              </DropdownMenuItem>
            </Button>
            <Button variant="ghost" className="w-full flex justify-start" onClick={handleLogout}>
              <DropdownMenuItem>
                <LogOut size={18} />
                <span>Log Out</span>
              </DropdownMenuItem>
            </Button>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
