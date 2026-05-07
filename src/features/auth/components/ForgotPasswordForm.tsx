import { Button, ErrorText, InlineLoader, Input } from "@/components";
import {
  resetPasswordSchema,
  type ResetPasswordSchemaType,
} from "@/features/auth/schemas";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FaEnvelope } from "react-icons/fa";
import { POST_FORGOT_PASSWORD } from "@/data/routes";

export default function ForgotPasswordForm() {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [sentDate, setSentDate] = useState<Date>();
  const [countDown, setCountDown] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const getTimeLeft = () => {
      if (!sentDate) return 0;
      const now = new Date();
      const diff = Math.floor((now.getTime() - sentDate.getTime()) / 1000);
      const countDownValue = 60 - diff;
      return countDownValue;
    };

    if (sentDate) {
      const initialCountDown = getTimeLeft();
      setCountDown(initialCountDown <= 0 ? undefined : initialCountDown);

      interval = setInterval(() => {
        const countDownValue = getTimeLeft();
        if (countDownValue <= 0) {
          setCountDown(undefined);
          clearInterval(interval);
        } else {
          setCountDown(countDownValue);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sentDate]);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(
      resetPasswordSchema,
    ) as unknown as Resolver<ResetPasswordSchemaType>,
  });

  const submit = async (bodyData: ResetPasswordSchemaType) => {
    try {
      setIsLoading(true);
      setError(undefined);

      await api.post(POST_FORGOT_PASSWORD, bodyData);
      setSentDate(new Date());
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
        <div className="w-full flex flex-col gap-1">
          <Input
            label="Email"
            type="email"
            name="email"
            required
            placeholder="example@gmail.com"
            error={errors.email?.message}
            register={register}
          />
          <NavLink to="/auth/login" className="text-sm text-pri ml-auto">
            Back to login
          </NavLink>
        </div>
        {countDown && (
          <p className="text-xs text-text-sec">
            Try again in{" "}
            <span className="font-semibold text-pri">{countDown}</span> seconds.
          </p>
        )}
        <Button
          type="submit"
          btnType="primary"
          disabled={!!countDown || isLoading}
        >
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

            <div>
              <h2 className="text-2xl font-semibold text-center capitalize">
                Check your email
              </h2>
              <p className="text-text-sec mt-2 text-center max-w-[17pc] text-sm">
                We have sent a password reset link to your email.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
