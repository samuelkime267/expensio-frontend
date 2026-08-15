import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import type { duration } from "@/data/durations.data";
import { getAnalytics } from "../services";

export function useGetAnalytics(duration: duration = "month") {
  const { id } = useAuth();

  return useQuery({
    queryFn: () => getAnalytics(duration),
    queryKey: ["get-analytics", id, duration],
    enabled: !!id,
  });
}
