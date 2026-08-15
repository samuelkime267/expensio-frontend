import { Settings } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiLoop } from "react-icons/tfi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineSavings } from "react-icons/md";
import { FaChartPie, FaPiggyBank } from "react-icons/fa6";

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
    name: "Analytics",
    link: "/analytics",
    Icon: FaChartPie,
    isLocked: false,
  },
  {
    name: "Budget",
    link: "/budget",
    Icon: FaPiggyBank,
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
