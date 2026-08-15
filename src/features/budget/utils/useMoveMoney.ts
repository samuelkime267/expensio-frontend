import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveMoney } from "../services";
import { handleError } from "@/utils";

type UseMoveMoneyProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

export function useMoveMoney({
  setError,
  onSuccess,
  onError,
}: UseMoveMoneyProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof moveMoney>[1];
    }) => moveMoney(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
