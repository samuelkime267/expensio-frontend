import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGoal } from "../services";
import { handleError } from "@/utils";

type UseUpdateGoalProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useUpdateGoal({
  setError,
  onSuccess,
  onError,
}: UseUpdateGoalProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof updateGoal>[1];
    }) => updateGoal(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
