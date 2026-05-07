import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import Homepage from "@/pages/Homepage";
import Notfound from "@/pages/Notfound";

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
    path: "*",
    Component: Notfound,
  },
];
