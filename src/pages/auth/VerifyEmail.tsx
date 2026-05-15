import { Button, ErrorText, InlineLoader } from "@/components";
import { Logo } from "@/components/icons";
import { VerifyEmailForm } from "@/features/auth/components";
import api from "@/lib/api";
import { useAuth } from "@/stores";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { token } = useAuth();

  const sendVerificationEmail = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);

      await api.post(`/auth/verify-email`);
      setIsEmailSent(true);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        setError("Something went wrong");
        return;
      }
      setError(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    sendVerificationEmail();
  }, [sendVerificationEmail, token]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-4 flex-col">
      <Logo className="w-16 h-auto text-pri" />
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-medium">Verify Email</h1>
        <p className="text-text-sec">An OTP will be sent to your email</p>
      </div>
      <div className="w-full flex items-center justify-center p-4 flex-col gap-4 max-w-md">
        <InlineLoader className="text-white size-16" isLoading={isLoading} />
        {!isEmailSent && <ErrorText error={error} />}
        {!isEmailSent && error && error !== "Email is already verified." && (
          <Button btnType="primary" onClick={sendVerificationEmail}>
            Retry
          </Button>
        )}
        {isEmailSent && <VerifyEmailForm />}
      </div>
    </div>
  );
}
