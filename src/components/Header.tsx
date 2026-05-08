import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";
import Button from "./Button";
import { AUTH_PREFIX, DEFAULT_AUTH_REDIRECT_ROUTE } from "@/data/routes.data";
import Notification from "./Notification";
import { UserHeaderDropdown } from "@/features/user/components";

export default function Header() {
  const { isLoggedIn, username } = useAuth();
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);

  if (isAuthRoute) return null;

  return (
    <div className="w-full flex items-center justify-between gap-6 sticky top-0 right-0 z-50 rounded-bl-2xl bg-sur">
      <div className="bg-bg w-full p-4 flex items-center justify-between gap-6 z-50 rounded-tl-2xl">
        <div>
          <h1 className="text-2xl font-medium capitalize text-pri">
            {username ? `Welcome, ${username}` : "Welcome back"}
          </h1>
        </div>

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
    </div>
  );
}
