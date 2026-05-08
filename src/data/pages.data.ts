import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import Homepage from "@/pages/Homepage";
import Notfound from "@/pages/Notfound";
import Income from "@/pages/Income";
import Expenses from "@/pages/Expenses";
import Dashboard from "@/pages/Dashboard";
import Subscriptions from "@/pages/Subscriptions";
import Account from "@/pages/Account";

export const pages = [
  {
    path: "/",
    Component: Homepage,
  },
  {
    path: "/auth/login",
    Component: Login,
  },
  {
    path: "/auth/register",
    Component: Register,
  },
  {
    path: "/auth/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/auth/verify-email",
    Component: VerifyEmail,
  },
  {
    path: "/auth/reset-password/:token",
    Component: ResetPassword,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/income",
    Component: Income,
  },
  {
    path: "/expenses",
    Component: Expenses,
  },
  {
    path: "/subscriptions",
    Component: Subscriptions,
  },
  {
    path: "/account",
    Component: Account,
  },
  {
    path: "*",
    Component: Notfound,
  },
];
