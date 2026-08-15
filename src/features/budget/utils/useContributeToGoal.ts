import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contributeToGoal } from "../services";
import { handleError } from "@/utils";
import { BALANCE_QUERY_KEY } from "@/data/queryKeys.data";

type UseContributeToGoalProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useContributeToGoal({
  setError,
  onSuccess,
  onError,
}: UseContributeToGoalProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      contributeToGoal(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: BALANCE_QUERY_KEY,
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
