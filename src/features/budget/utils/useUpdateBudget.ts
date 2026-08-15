import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBudget } from "../services";
import { handleError } from "@/utils";

type UseUpdateBudgetProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useUpdateBudget({
  setError,
  onSuccess,
  onError,
}: UseUpdateBudgetProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateBudget>[1] }) =>
      updateBudget(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
