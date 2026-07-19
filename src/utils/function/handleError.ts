import { toast } from "sonner";
import { AppError } from "../class/AppError";

export function handleError(
  error: Error,
  setError?: (error: string) => void,
  onError?: () => void,
) {
  if (onError) onError();

  if (error instanceof AppError) {
    toast.error(error.message);
    if (setError) setError(error.message);
    return;
  }

  toast.error("Something went wrong");
  if (setError) setError("Something went wrong");
}
