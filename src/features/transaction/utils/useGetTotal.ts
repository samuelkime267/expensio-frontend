import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getTotal } from "../services";
import type { duration } from "@/data/durations.data";

export function useGetTotal(duration: duration = "all-time") {
  const { id } = useAuth();

  return useQuery({
    queryFn: () => getTotal(duration),
    queryKey: ["get-total", id, duration],
    enabled: !!id,
  });
}
