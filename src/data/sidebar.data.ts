import { Settings } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiLoop } from "react-icons/tfi";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";

export const sidebarData = [
  {
    name: "Dashbaord",
    link: "/dashboard",
    Icon: LuLayoutDashboard,
  },
  {
    name: "Income",
    link: "/income",
    Icon: GiReceiveMoney,
  },
  {
    name: "Expense",
    link: "/expenses",
    Icon: GiPayMoney,
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
