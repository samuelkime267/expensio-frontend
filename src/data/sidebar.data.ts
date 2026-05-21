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
  },
  {
    name: "Transactions",
    link: "/transactions",
    Icon: GiReceiveMoney,
  },
  {
    name: "Savings",
    link: "/savings",
    Icon: MdOutlineSavings,
  },
  {
    name: "Subscriptions",
    link: "/subscriptions",
    Icon: TfiLoop,
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
