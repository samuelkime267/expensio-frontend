import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";
import { AUTH_PREFIX } from "@/data/routes.data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/utils";
import { FiLogOut } from "react-icons/fi";
import { Button } from "@/components";
import UserProfileImg from "./UserProfileImg";

export default function UserHeaderDropdown() {
  const { name, email, profilePicture } = useAuth();
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);
  const { logout } = useLogout();

  if (isAuthRoute) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center justify-center gap-2 ">
          <UserProfileImg name={name} profilePicture={profilePicture} />

          <div>
            <p className="text-sm font-medium text-nowrap text-left">{name}</p>
            <p className="text-[10px] text-text-sec text-left">{email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-bg" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink to="/account" className={"text-text-pri"}>
              Profile
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Button
            onClick={logout}
            className="flex items-center justify-start gap-2 text-red-600 p-2.5 w-full text-sm font-medium"
          >
            <FiLogOut />
            Logout
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
