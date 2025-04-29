import { getFirstName } from "@/utils/getFirstName";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { userDetailInterface } from "@/model/user.model";

export default function ProfileComponent({ userDetail }: { userDetail: userDetailInterface | null }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {userDetail && (
            <Button variant="outline" className="flex items-center gap-2">
              <User size={18} />
              <span className="text-base hidden sm:block">{getFirstName(userDetail.name)}</span>
            </Button>
          )}
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
    </>
  );
}
