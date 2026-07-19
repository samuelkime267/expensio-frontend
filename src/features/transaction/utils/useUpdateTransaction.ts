import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "../services";
import { handleError } from "@/utils";
import { BALANCE_QUERY_KEY } from "@/data/queryKeys.data";
import type { CreateTransactionSchemaType } from "../schemas";

type UseUpdateTransactionProps =
  | {
      setError?: React.Dispatch<React.SetStateAction<string>>;
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;

type UpdateTransactionProps = {
  transaction: CreateTransactionSchemaType;
  id: string;
};

export function useUpdateTransaction({
  setError,
  onSuccess,
  onError,
}: UseUpdateTransactionProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, transaction }: UpdateTransactionProps) => {
      if (!id || !transaction) return;
      return await updateTransaction(id, transaction);
    },
    onSuccess: (returnedData) => {
      queryClient.invalidateQueries({
        queryKey: BALANCE_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-total"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-cashflow"],
      });
      if (returnedData)
        queryClient.invalidateQueries({
          queryKey: ["transaction", returnedData._id],
        });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
