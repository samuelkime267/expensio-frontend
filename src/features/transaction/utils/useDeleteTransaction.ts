import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../services";
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

export function useDeleteTransaction({
  setError,
  onSuccess,
  onError,
}: UseUpdateTransactionProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
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
      // if (returnedData)
      //   queryClient.invalidateQueries({
      //     queryKey: ["transaction", returnedData._id],
      //   });
      if (onSuccess) onSuccess();
    },
    onError: (error) => handleError(error, setError, onError),
  });
}
