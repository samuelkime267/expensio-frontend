import { FaSearch } from "react-icons/fa";
import Input from "./Input";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";
import Button from "./Button";
import { AUTH_PREFIX, DEFAULT_AUTH_REDIRECT_ROUTE } from "@/data/routes.data";
import Notification from "./Notification";
import { UserHeaderDropdown } from "@/features/user/components";

export default function Header() {
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);

  if (isAuthRoute) return null;

  return (
    <div className="bg-sur w-full p-4 flex items-center justify-between gap-6 border-b border-b-bor sticky top-0 right-0 z-50">
      <Input className="pl-2 w-[15rem]" placeholder="Search...">
        <FaSearch className="size-3 text-muted" />
      </Input>

      <div className="flex items-center justify-center gap-4">
        <Notification />

        {isLoggedIn ? (
          <UserHeaderDropdown />
        ) : (
          <NavLink to={DEFAULT_AUTH_REDIRECT_ROUTE}>
            <Button btnType="primary" className="text-nowrap">
              Log in
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
