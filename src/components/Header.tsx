import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";
import Button from "./Button";
import { AUTH_PREFIX, DEFAULT_AUTH_REDIRECT_ROUTE } from "@/data/routes.data";
import Notification from "./Notification";
import { UserHeaderDropdown } from "@/features/user/components";
import { IoMenu } from "react-icons/io5";
import { Logo } from "./icons";

type HeaderProps = {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
};

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  const { isLoggedIn, username } = useAuth();
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (isAuthRoute) return null;

  return (
    <div className="w-full flex items-center justify-between gap-6 sticky top-0 right-0 z-50 rounded-bl-2xl bg-sur">
      <div className="bg-bg w-full p-4 flex items-center justify-between gap-6 z-50 rounded-tl-2xl">
        <div className="flex items-center gap-4">
          <NavLink to="/" onClick={closeSidebar} className={"xl:hidden"}>
            <Logo className="size-10 text-pri" />
          </NavLink>
          <h1 className="text-2xl font-medium capitalize text-pri hidden md:block">
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

          <Button
            className="xl:hidden"
            onClick={() => setIsSidebarOpen((s) => !s)}
          >
            <IoMenu className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
