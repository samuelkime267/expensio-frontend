import { useAuth } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getBudgetSuggestions } from "../services";

export function useGetBudgetSuggestions(year: number, month: number) {
  const { id } = useAuth();

  return useQuery({
    queryFn: () => getBudgetSuggestions(year, month),
    queryKey: ["budget-suggestions", id, year, month],
    enabled: !!id,
  });
}
