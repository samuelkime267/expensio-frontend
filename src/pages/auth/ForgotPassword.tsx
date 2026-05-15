import { Logo } from "@/components/icons";
import { ForgotPasswordForm } from "@/features/auth/components";
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-4 flex-col">
      <Logo className="w-16 h-auto text-pri" />
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-medium">Forgot Password</h1>
        <p className="text-text-sec">Enter your email to reset your password</p>
      </div>
      <div className="w-full flex items-center justify-center p-4 flex-col">
        <ForgotPasswordForm />

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <NavLink to="/auth/register" className="text-pri underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}
