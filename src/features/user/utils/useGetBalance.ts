import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getBalanceRequest } from "../services";

export default function useGetBalance() {
  const { id } = useAuth();

  return useQuery({
    queryFn: getBalanceRequest,
    queryKey: ["balance", id],
    enabled: !!id,
  });
}
