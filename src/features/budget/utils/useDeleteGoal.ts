import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGoal } from "../services";
import { handleError } from "@/utils";

type UseDeleteGoalProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useDeleteGoal({
  setError,
  onSuccess,
  onError,
}: UseDeleteGoalProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
