import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getCashflow } from "../services";
import type { duration } from "@/data/durations.data";

export function useGetCashflow(duration: duration = "week") {
  const { id } = useAuth();

  return useQuery({
    queryFn: () => getCashflow(duration),
    queryKey: ["get-cashflow", id, duration],
    enabled: !!id,
  });
}
