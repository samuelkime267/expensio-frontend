import api from "@/lib/api";
import { apiHandler } from "@/utils";
import { CategoriesSchema } from "../schema";

type UseGetCategoriesProps = boolean | undefined;

export const getCategories = async (isIncome: UseGetCategoriesProps) => {
  return apiHandler(CategoriesSchema, () =>
    api.get(
      `/category${isIncome !== undefined ? (isIncome ? "?type=income" : "?type=expense") : ""}`,
    ),
  );
};
