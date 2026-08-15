import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getGoals } from "../services";

export function useGetGoals() {
  const { id } = useAuth();

  return useQuery({
    queryFn: () => getGoals(),
    queryKey: ["goals", id],
    enabled: !!id,
  });
}
