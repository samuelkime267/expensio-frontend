import { Button, ErrorText, InlineLoader } from "@/components";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FaCheck } from "react-icons/fa";
import { GET_VERIFY_EMAIL, POST_VERIFY_EMAIL } from "@/data/routes";

export default function VerifyEmailForm() {
  const maxLength = 6;
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [sentDate, setSentDate] = useState<Date | undefined>(new Date());
  const [countDown, setCountDown] = useState<number>();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(undefined);

      await api.get(GET_VERIFY_EMAIL(otp));
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

  const sendVerificationEmail = async () => {
    try {
      setIsLoading(true);
      setError(undefined);

      await api.post(POST_VERIFY_EMAIL);
      setSentDate(new Date());
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
      <div className="space-y-8">
        <ErrorText error={error} />

        <div className="space-y-4">
          <InputOTP
            maxLength={maxLength}
            value={otp}
            onChange={(otp) => setOtp(otp)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="p-6" />
              <InputOTPSlot index={1} className="p-6" />
              <InputOTPSlot index={2} className="p-6" />
              <InputOTPSlot index={3} className="p-6" />
              <InputOTPSlot index={4} className="p-6" />
              <InputOTPSlot index={5} className="p-6" />
            </InputOTPGroup>
          </InputOTP>
          {countDown ? (
            <p className="text-xs text-text-sec">
              Try again in{" "}
              <span className="font-semibold text-pri">{countDown}</span>{" "}
              seconds.
            </p>
          ) : (
            <Button
              className="text-pri text-xs font-semibold"
              disabled={isLoading}
              onClick={sendVerificationEmail}
            >
              Resend
            </Button>
          )}
        </div>
        <Button
          disabled={isLoading || otp.length !== maxLength || !Number(otp)}
          btnType="primary"
          onClick={handleSubmit}
        >
          {isLoading ? <InlineLoader /> : "Verify Email"}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-sm ">
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="bg-success/20 flex items-center justify-center p-4 w-fit rounded-full">
              <div className="bg-success flex items-center justify-center p-6 w-fit rounded-full">
                <FaCheck className="text-white size-12" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h2 className="text-2xl font-semibold text-center capitalize">
                Email Verified Successful
              </h2>
              <p className="text-text-sec mt-2 text-center max-w-[17pc] text-sm">
                Proceed to home page
              </p>
              <NavLink to="/">
                <Button btnType="primary">Go to Home</Button>
              </NavLink>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
