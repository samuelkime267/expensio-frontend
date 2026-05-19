import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services";

export function useGetCategory() {}

type UseGetCategoriesProps = boolean | undefined;

export function useGetCategories(isIncome?: UseGetCategoriesProps) {
  return useQuery({
    queryFn: () => getCategories(isIncome),
    queryKey:
      isIncome !== undefined
        ? ["categories", isIncome ? "income" : "expense"]
        : ["categories"],
  });
}
