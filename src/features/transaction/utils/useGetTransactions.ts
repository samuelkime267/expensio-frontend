import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, type TransactionQueries } from "../services";

export function useGetTransactions(queries: TransactionQueries = undefined) {
  const { type, page, count, endDate, startDate } = queries || {};
  const { id } = useAuth();

  return useQuery({
    queryFn: () => getTransactions(queries),
    queryKey: ["transactions", id, type, page, count, endDate, startDate],
    enabled: !!id,
  });
}
