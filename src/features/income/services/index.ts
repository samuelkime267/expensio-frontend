import { POST_CREATE_INCOME } from "@/data/routes";
import { createIncomeSchema, type CreateIncomeSchemaType } from "../schema";
import api from "@/lib/api";
import { apiHandler } from "@/utils";

export const logIncome = async (data: CreateIncomeSchemaType) =>
  apiHandler(createIncomeSchema, () => api.post(POST_CREATE_INCOME, data));
