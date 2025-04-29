import { LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getFirstName } from "@/utils/getFirstName";
import { userDetailInterface } from "@/model/user.model";

export default async function Profile({ userDetail }: { userDetail: userDetailInterface | null }) {
  // const userDetailIntial = await userDetail;

  return userDetail ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <User size={18} />
          <span className="text-base">{getFirstName(userDetail.name)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User size={18} />
            <span>Profile Saya</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut size={18} />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex gap-2">
      <Button variant="ghost" className="rounded-full bg-[#D94B6B] text-white hover:bg-[#C75C71]">
        Daftar
      </Button>
      <Button variant="ghost" className="rounded-full bg-[#FFA500] text-black hover:bg-[#FF8C00]">
        Masuk
      </Button>
    </div>
  );
}
