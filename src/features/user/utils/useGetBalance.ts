import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getBalanceRequest } from "../services";
import { BALANCE_QUERY_KEY } from "@/data/queryKeys.data";

export default function useGetBalance() {
  const { id } = useAuth();

  return useQuery({
    queryFn: getBalanceRequest,
    queryKey: BALANCE_QUERY_KEY,
    enabled: !!id,
  });
}
