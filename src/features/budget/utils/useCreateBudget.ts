import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudget } from "../services";
import { handleError } from "@/utils";

type UseCreateBudgetProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useCreateBudget({
  setError,
  onSuccess,
  onError,
}: UseCreateBudgetProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
