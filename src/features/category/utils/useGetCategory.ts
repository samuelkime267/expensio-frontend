import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services";
import { useAuth } from "@/stores";

export function useGetCategory() {}

type UseGetCategoriesProps = boolean | undefined;

export function useGetCategories(isIncome?: UseGetCategoriesProps) {
  const { id } = useAuth();
  return useQuery({
    queryFn: () => getCategories(isIncome),
    queryKey:
      isIncome !== undefined
        ? ["categories", isIncome ? "income" : "expense"]
        : ["categories"],
    enabled: !!id,
  });
}
