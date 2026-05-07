import rivoLogo from "@/assets/imgs/rivo-logo.png";
import { ResetPasswordForm } from "@/features/auth/components";
import { NavLink } from "react-router-dom";

export default function ResetPassword() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-4 flex-col">
      <img src={rivoLogo} alt="Rivo logo" className="w-16" />
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-medium">Reset Password</h1>
        <p className="text-text-sec">Enter your new password below</p>
      </div>
      <div className="w-full flex items-center justify-center p-4 flex-col">
        <ResetPasswordForm />

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
