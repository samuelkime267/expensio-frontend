import { POST_CREATE_EXPENSE } from "@/data/routes";
import { createExpenseSchema, type CreateExpenseSchemaType } from "../schema";
import api from "@/lib/api";
import { apiHandler } from "@/utils";

export const logExpense = async (data: CreateExpenseSchemaType) =>
  apiHandler(createExpenseSchema, () => api.post(POST_CREATE_EXPENSE, data));
