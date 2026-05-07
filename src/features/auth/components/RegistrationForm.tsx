import { Button, ErrorText, InlineLoader, Input } from "@/components";
import useRegister from "../utils/useRegister";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import useOAuth from "../utils/useOAuth";

export default function RegistrationForm() {
  const [error, setError] = useState<string>();
  const { formErrors, isLoading, register, submit } = useRegister(setError);
  const { loginWithGoogle } = useOAuth(setError);

  return (
    <form className="w-full space-y-4 max-w-md" onSubmit={submit}>
      <ErrorText error={error} />

      <Input
        label="Name"
        name="name"
        required
        placeholder="John Doe"
        error={formErrors.name?.message}
        register={register}
      />
      <Input
        label="Username"
        name="username"
        required
        placeholder="JohnDoe"
        error={formErrors.username?.message}
        register={register}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        required
        placeholder="example@gmail.com"
        error={formErrors.email?.message}
        register={register}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        required
        placeholder="Enter your password"
        error={formErrors.password?.message}
        register={register}
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        required
        placeholder="Enter your password"
        error={formErrors.confirmPassword?.message}
        register={register}
      />
      <Button disabled={isLoading} type="submit" btnType="primary">
        {isLoading ? <InlineLoader /> : "Register"}
      </Button>

      <div className="w-full flex items-center justify-center gap-1">
        <div className="border-t border-t-text-mute w-full" />
        <p className="text-xs text-center text-text-mute">or</p>
        <div className="border-t border-t-text-mute w-full" />
      </div>
      <Button type="button" btnType="secondary" onClick={loginWithGoogle}>
        <FcGoogle className="size-4" /> Register with Google
      </Button>
    </form>
  );
}
