import { RegistrationForm } from "@/features/auth/components";
import { NavLink } from "react-router-dom";
import rivoLogo from "@/assets/imgs/rivo-logo.png";

export default function Register() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-4 flex-col p-4">
      <img src={rivoLogo} alt="Rivo logo" className="w-16" />
      <div className="flex items-center justify-center flex-col">
        <p className="text-text-mute text-sm">Welcome</p>
        <h1 className="text-2xl font-medium">Register now!</h1>
      </div>

      <div className="w-full flex items-center justify-center p-4 flex-col">
        <RegistrationForm />

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <NavLink to="/auth/login" className="text-pri underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
