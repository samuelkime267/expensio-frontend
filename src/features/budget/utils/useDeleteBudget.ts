import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget } from "../services";
import { handleError } from "@/utils";

type UseDeleteBudgetProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useDeleteBudget({
  setError,
  onSuccess,
  onError,
}: UseDeleteBudgetProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
