import {
  CONTRIBUTE_TO_GOAL,
  CREATE_BUDGET,
  CREATE_GOAL,
  DELETE_BUDGET,
  DELETE_GOAL,
  GET_BUDGET,
  GET_BUDGET_SUGGESTIONS,
  GET_GOALS,
  MOVE_BUDGET_MONEY,
  UPDATE_BUDGET,
  UPDATE_GOAL,
} from "@/data/routes";
import api from "@/lib/api";
import { apiHandler } from "@/utils";
import {
  budgetSuggestionsSchema,
  getBudgetSchema,
  goalsSchema,
  type CreateBudgetPayload,
  type CreateGoalPayload,
  type MoveMoneyPayload,
  type UpdateBudgetPayload,
  type UpdateGoalPayload,
} from "../schemas";

export const getBudget = (year: number, month: number) =>
  apiHandler(getBudgetSchema, () =>
    api.get(`${GET_BUDGET}?year=${year}&month=${month}`),
  );

export const getBudgetSuggestions = (year: number, month: number) =>
  apiHandler(budgetSuggestionsSchema, () =>
    api.get(`${GET_BUDGET_SUGGESTIONS}?year=${year}&month=${month}`),
  );

export const createBudget = (payload: CreateBudgetPayload) =>
  apiHandler(() => api.post(CREATE_BUDGET, payload));

export const updateBudget = (id: string, payload: UpdateBudgetPayload) =>
  apiHandler(() => api.put(UPDATE_BUDGET.replace(":id", id), payload));

export const deleteBudget = (id: string) =>
  apiHandler(() => api.delete(DELETE_BUDGET.replace(":id", id)));

export const moveMoney = (id: string, payload: MoveMoneyPayload) =>
  apiHandler(() =>
    api.post(MOVE_BUDGET_MONEY.replace(":id", id), payload),
  );

export const getGoals = () =>
  apiHandler(goalsSchema, () => api.get(GET_GOALS));

export const createGoal = (payload: CreateGoalPayload) =>
  apiHandler(() => api.post(CREATE_GOAL, payload));

export const updateGoal = (id: string, payload: UpdateGoalPayload) =>
  apiHandler(() => api.put(UPDATE_GOAL.replace(":id", id), payload));

export const deleteGoal = (id: string) =>
  apiHandler(() => api.delete(DELETE_GOAL.replace(":id", id)));

export const contributeToGoal = (id: string, amount: number) =>
  apiHandler(() => api.post(CONTRIBUTE_TO_GOAL.replace(":id", id), { amount }));
