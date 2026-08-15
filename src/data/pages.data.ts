import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import Homepage from "@/pages/Homepage";
import Notfound from "@/pages/Notfound";
import Dashboard from "@/pages/Dashboard";
import Subscriptions from "@/pages/Subscriptions";
import Account from "@/pages/Account";
import Transactions from "@/pages/Transactions";
import TransactionSummary from "@/pages/TransactionSummary";
import Savings from "@/pages/Savings";
import Analytics from "@/pages/Analytics";
import Budget from "@/pages/Budget";

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
    path: "/transactions",
    Component: Transactions,
  },
  {
    path: "/transactions/:id",
    Component: TransactionSummary,
  },
  {
    path: "/analytics",
    Component: Analytics,
  },
  {
    path: "/budget",
    Component: Budget,
  },
  {
    path: "/savings",
    Component: Savings,
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
