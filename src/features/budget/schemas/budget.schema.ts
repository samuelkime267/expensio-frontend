import { z } from "zod";

export const budgetItemTypeSchema = z.enum(["FIXED", "FLEXIBLE", "GOAL"]);
export const budgetStatusSchema = z.enum([
  "UNDER_BUDGET",
  "ON_TRACK",
  "NEAR_LIMIT",
  "OVER_BUDGET",
  "NO_BUDGET",
]);

export const budgetCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

export const budgetItemSchema = z.object({
  category: budgetCategorySchema,
  amount: z.number(),
  type: budgetItemTypeSchema,
  spent: z.number(),
  remaining: z.number(),
  percentageUsed: z.number(),
  status: budgetStatusSchema,
  expectedSpend: z.number(),
  pace: z.enum(["ahead", "behind", "on-track"]),
  previousSpent: z.number(),
  previousBudgetAmount: z.number(),
});

export const budgetOverviewSchema = z.object({
  totalPlanned: z.number(),
  totalSpent: z.number(),
  income: z.number(),
  remaining: z.number(),
  safeToSpend: z.number(),
  weeklySafe: z.number(),
  percentageUsed: z.number(),
});

export const budgetSchema = z.object({
  _id: z.string(),
  periodStart: z.coerce.date(),
  periodEnd: z.coerce.date(),
  income: z.number(),
  daysInMonth: z.number(),
  daysElapsed: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  overview: budgetOverviewSchema,
  items: z.array(budgetItemSchema),
});

export const getBudgetSchema = z.object({
  budget: budgetSchema.nullable(),
});

export const suggestionCategorySchema = z.object({
  value: z.string(),
  name: z.string(),
  avg3Months: z.number(),
  lastMonth: z.number(),
  suggested: z.number(),
  bucket: budgetItemTypeSchema,
});

export const budgetSuggestionsSchema = z.object({
  year: z.number(),
  month: z.number(),
  incomeEstimate: z.number(),
  historicalMonthlyAverage: z.number(),
  categories: z.array(suggestionCategorySchema),
});

export const goalSchema = z.object({
  _id: z.string(),
  name: z.string(),
  targetAmount: z.number(),
  targetDate: z.coerce.date(),
  monthlyContribution: z.number(),
  saved: z.number(),
  remaining: z.number(),
  monthsLeft: z.number(),
  progress: z.number(),
  recommendedContribution: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const goalsSchema = z.array(goalSchema);

export type BudgetItemType = z.infer<typeof budgetItemTypeSchema>;
export type BudgetStatus = z.infer<typeof budgetStatusSchema>;
export type BudgetItemSchemaType = z.infer<typeof budgetItemSchema>;
export type BudgetSchemaType = z.infer<typeof budgetSchema>;
export type BudgetOverviewSchemaType = z.infer<typeof budgetOverviewSchema>;
export type BudgetSuggestionsSchemaType = z.infer<
  typeof budgetSuggestionsSchema
>;
export type GoalSchemaType = z.infer<typeof goalSchema>;

export type BudgetItemPayload = {
  category: string;
  amount: number;
  type: BudgetItemType;
};

export type CreateBudgetPayload = {
  year: number;
  month: number;
  income: number;
  items: BudgetItemPayload[];
};

export type UpdateBudgetPayload = {
  income: number;
  items: BudgetItemPayload[];
};

export type MoveMoneyPayload = {
  fromValue: string;
  toValue: string;
  amount: number;
};

export type CreateGoalPayload = {
  name: string;
  targetAmount: number;
  targetDate: string;
};

export type UpdateGoalPayload = {
  name: string;
  targetAmount: number;
  targetDate: string;
  monthlyContribution: number;
};
