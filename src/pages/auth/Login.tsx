import { NavLink } from "react-router-dom";
import { LoginForm } from "@/features/auth/components";
import { Logo } from "@/components/icons";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-4 flex-col">
      <Logo className="w-16 h-auto text-pri" />
      <div className="flex items-center justify-center flex-col">
        <p className="text-text-mute text-sm">Welcome</p>
        <h1 className="text-2xl font-medium">Login now!</h1>
      </div>
      <div className="w-full flex items-center justify-center p-4 flex-col">
        <LoginForm />

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
