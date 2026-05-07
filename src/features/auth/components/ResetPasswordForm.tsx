import { Button, ErrorText, InlineLoader, Input } from "@/components";
import {
  updatePasswordSchema,
  type UpdatePasswordSchemaType,
} from "@/features/auth/schemas";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { NavLink, useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FaEnvelope } from "react-icons/fa";
import { POST_RESET_PASSWORD } from "@/data/routes";

export default function ResetPasswordForm() {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useParams();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(
      updatePasswordSchema,
    ) as unknown as Resolver<UpdatePasswordSchemaType>,
  });

  const submit = async (bodyData: UpdatePasswordSchemaType) => {
    try {
      setIsLoading(true);
      setError(undefined);

      if (!token) {
        setError("Something went wrong");
        return;
      }

      await api.post(POST_RESET_PASSWORD(token), bodyData);
      setIsOpen(true);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        setError("Something went wrong");
        return;
      }
      setError(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-full space-y-4 max-w-md"
        onSubmit={handleSubmit(submit)}
      >
        <ErrorText error={error} />
        <Input
          label="Password"
          type="password"
          name="password"
          required
          placeholder="Enter your password"
          error={errors.password?.message}
          register={register}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          placeholder="Enter your password"
          error={errors.confirmPassword?.message}
          register={register}
        />
        <Button type="submit" btnType="primary" disabled={isLoading}>
          {isLoading ? <InlineLoader /> : "Reset Password"}
        </Button>
      </form>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-sm ">
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="bg-success/20 flex items-center justify-center p-4 w-fit rounded-full">
              <div className="bg-success flex items-center justify-center p-6 w-fit rounded-full">
                <FaEnvelope className="text-white size-12" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h2 className="text-2xl font-semibold text-center capitalize">
                Password Reset Successful
              </h2>
              <p className="text-text-sec mt-2 text-center max-w-[17pc] text-sm">
                Proceed to login with your new password.
              </p>
              <NavLink to="/auth/login">
                <Button btnType="primary">Go to Login</Button>
              </NavLink>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
