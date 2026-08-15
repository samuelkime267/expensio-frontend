import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal } from "../services";
import { handleError } from "@/utils";

type UseCreateGoalProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useCreateGoal({
  setError,
  onSuccess,
  onError,
}: UseCreateGoalProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
