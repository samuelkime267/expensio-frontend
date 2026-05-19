import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppError } from "@/utils";
import { logExpense } from "../services";

type UseLogIncomeProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useLogExpense({
  setError,
  onSuccess,
  onError,
}: UseLogIncomeProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (onError) onError();

      if (error instanceof AppError) {
        toast.error(error.message);
        if (setError) setError(error.message);
        return;
      }

      toast.error("Something went wrong");
      if (setError) setError("Something went wrong");
    },
  });
}
