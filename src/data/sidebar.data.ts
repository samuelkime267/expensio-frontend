import { Settings } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiLoop } from "react-icons/tfi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineSavings } from "react-icons/md";

export const sidebarData = [
  {
    name: "Dashbaord",
    link: "/dashboard",
    Icon: LuLayoutDashboard,
    isLocked: false,
  },
  {
    name: "Transactions",
    link: "/transactions",
    Icon: GiReceiveMoney,
    isLocked: false,
  },
  {
    name: "Savings",
    link: "/savings",
    Icon: MdOutlineSavings,
    isLocked: true,
  },
  {
    name: "Subscriptions",
    link: "/subscriptions",
    Icon: TfiLoop,
    isLocked: true,
  },
];

export const subSidebarData = [
  {
    name: "Account",
    link: "/account",
    Icon: Settings,
  },
];

export const hideNavRoutes = ["/auth/login", "/auth/register"];
