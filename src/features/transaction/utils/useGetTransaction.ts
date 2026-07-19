import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "../services";

export function useGetTransaction(transactionId: string) {
  const { id } = useAuth();

  return useQuery({
    queryFn: () => getTransaction(transactionId),
    queryKey: ["transaction", transactionId],
    enabled: !!id,
  });
}
