import { NavLink } from "react-router-dom";
import { Button, ErrorText, InlineLoader, Input } from "@/components";
import { FcGoogle } from "react-icons/fc";
import useLogin from "../utils/useLogin";
import { useState } from "react";
import useOAuth from "../utils/useOAuth";

export default function LoginForm() {
  const [error, setError] = useState<string>();
  const { formErrors, isLoading, register, submit } = useLogin(setError);
  const { loginWithGoogle } = useOAuth(setError);

  return (
    <form className="w-full space-y-4 max-w-md" onSubmit={submit}>
      <ErrorText error={error} />

      <Input
        label="Email"
        type="email"
        name="email"
        required
        placeholder="example@gmail.com"
        error={formErrors.email?.message}
        register={register}
      />
      <div className="w-full flex flex-col gap-1">
        <Input
          label="Password"
          type="password"
          name="password"
          required
          placeholder="Enter your password"
          error={formErrors.password?.message}
          register={register}
        />
        <NavLink
          to="/auth/forgot-password"
          className="text-sm text-pri ml-auto"
        >
          Forgot password?
        </NavLink>
      </div>
      <Button type="submit" btnType="primary">
        {isLoading ? <InlineLoader /> : "Login"}
      </Button>

      <div className="w-full flex items-center justify-center gap-1">
        <div className="border-t border-t-text-mute w-full" />
        <p className="text-xs text-center text-text-mute">or</p>
        <div className="border-t border-t-text-mute w-full" />
      </div>
      <Button type="button" btnType="secondary" onClick={loginWithGoogle}>
        <FcGoogle className="size-4" /> Login with Google
      </Button>
    </form>
  );
}
