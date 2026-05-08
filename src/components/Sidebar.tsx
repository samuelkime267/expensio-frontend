import { sidebarData } from "@/data/sidebar.data";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router";
import Button from "./Button";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "@/stores";
import { AUTH_PREFIX } from "@/data/routes.data";
import { useLogout } from "@/features/auth/utils";
import { Logo } from "./icons";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuth();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);
  const { logout } = useLogout();

  if (isAuthRoute) return null;

  return (
    <div className="w-[15rem] min-w-[15rem] h-screen flex items-start justify-start flex-col gap-6 sticky top-0 left-0 z-50">
      <div className="bg-sur w-full min-w-full h-full p-4 flex items-start justify-start flex-col gap-8">
        <div className="w-full flex items-center justify-start">
          <Logo className="size-14 text-pri" />
        </div>

        <div className="w-full space-y-1">
          {sidebarData.map(({ name, link, Icon }, i) => {
            const isActive = pathname === link;

            return (
              <NavLink
                key={i}
                to={link}
                className={cn(
                  "w-full flex items-center justify-start gap-2 p-2.5 px-4 text-text-pri rounded-full text-sm group hover:bg-sec transition-colors duration-300",
                  {
                    "bg-sec": isActive,
                  },
                )}
              >
                <Icon
                  className={cn("size-5 text-text-pri", {
                    "": isActive,
                  })}
                />
                {name}
              </NavLink>
            );
          })}
        </div>

        <div className="w-full space-y-1 mt-auto">
          {isLoggedIn && (
            <Button
              onClick={logout}
              className="flex items-center justify-start gap-2 text-red-600 p-2.5 w-full text-sm"
            >
              <FiLogOut />
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
