import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../services";

export function useGetTransactions() {
  const { id } = useAuth();

  return useQuery({
    queryFn: getTransactions,
    queryKey: ["transactions", id],
    enabled: !!id,
  });
}
