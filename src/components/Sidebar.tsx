import { sidebarData } from "@/data/sidebar.data";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router";
import Button from "./Button";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "@/stores";
import { AUTH_PREFIX } from "@/data/routes.data";
import { useLogout } from "@/features/auth/utils";
import { Logo } from "./icons";
import { Lock, Plus } from "lucide-react";

type SidebarProps = {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
};

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuth();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);
  const { logout } = useLogout();
  const closeSidebar = () => setIsSidebarOpen(false);

  if (isAuthRoute) return null;

  return (
    <>
      <div
        onClick={closeSidebar}
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-pri/50 z-59 backdrop-blur-xs opacity-0 pointer-events-none duration-300 xl:hidden",
          {
            "opacity-100 pointer-events-auto": isSidebarOpen,
          },
        )}
      />
      <div
        className={cn(
          "w-full md:w-[15rem] xl:w-[13rem] xl:min-w-[13rem] 2xl:w-[16rem] 2xl:min-w-[16rem] xl:h-screen flex items-start justify-start flex-col gap-6 xl:sticky top-0 left-0 z-60 fixed h-full max-xl:translate-x-0 duration-300",
          {
            "max-xl:-translate-x-full": !isSidebarOpen,
          },
        )}
      >
        <div className="bg-sur w-full min-w-full h-full p-4 flex items-start justify-start flex-col gap-8">
          <div className="w-full flex items-center justify-between">
            <NavLink to="/" onClick={closeSidebar}>
              <Logo className="size-14 text-pri" />
            </NavLink>

            <Button
              className="border border-pri p-2 rounded-full xl:hidden"
              onClick={closeSidebar}
            >
              <Plus className="size-4 text-pri rotate-45" />
            </Button>
          </div>

          <div className="w-full space-y-1">
            {sidebarData.map(({ name, link, Icon, isLocked }, i) => {
              const isActive = pathname === link;
              const Element = !isLocked ? NavLink : "div";
              return (
                <Element
                  key={i}
                  to={link}
                  onClick={closeSidebar}
                  className={cn(
                    "w-full flex items-center justify-between gap-2 p-2.5 px-4 text-text-pri rounded-full text-sm group hover:bg-sec transition-colors duration-300",
                    {
                      "bg-sec": isActive,
                      "cursor-not-allowed": isLocked,
                    },
                  )}
                >
                  <div className="flex items-center justify-start gap-2">
                    <Icon
                      className={cn("size-5 text-text-pri", {
                        "": isActive,
                      })}
                    />
                    {name}
                  </div>
                  {isLocked && (
                    <Lock className="text-pri-text size-3 min-w-3 min-h-3" />
                  )}
                </Element>
              );
            })}
          </div>

          <div className="w-full space-y-1 mt-auto">
            {isLoggedIn && (
              <Button
                onClick={() => {
                  logout();
                  closeSidebar();
                }}
                className="flex items-center justify-start gap-2 text-red-600 p-2.5 w-full text-sm"
              >
                <FiLogOut />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
