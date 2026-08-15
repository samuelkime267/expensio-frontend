import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getBudget } from "../services";

export function useGetBudget(year: number, month: number) {
  const { id } = useAuth();

  return useQuery({
    queryFn: () => getBudget(year, month),
    queryKey: ["budget", id, year, month],
    enabled: !!id,
  });
}
