import {
  CREATE_TRANSACTION,
  GET_TRANSACTION,
  GET_TOTAL,
  GET_CASHFLOW,
} from "@/data/routes";
import api from "@/lib/api";
import { apiHandler } from "@/utils";
import {
  cashflowSchema,
  getTotalSchema,
  transactionSchema,
  transactionsSchema,
  type CreateTransactionSchemaType,
  type TransactionType,
} from "../schemas";
import type { duration } from "@/data/durations.data";

export const createTransaction = async (data: CreateTransactionSchemaType) =>
  apiHandler(transactionSchema, () => api.post(CREATE_TRANSACTION, data));

export const getTotal = async (duration: duration) =>
  apiHandler(getTotalSchema, () =>
    api.get(`${GET_TOTAL}?duration=${duration}`),
  );

export type TransactionQueries =
  | {
      page?: number;
      count?: number;
      type?: TransactionType;
      startDate?: number;
      endDate?: number;
    }
  | undefined;

export const getTransactions = async (queries: TransactionQueries) =>
  apiHandler(transactionsSchema, () =>
    api.get(
      `${GET_TRANSACTION}${queries ? `?${new URLSearchParams(queries as Record<string, string>)}` : ""}`,
    ),
  );

export const getTransaction = async (id: string) =>
  apiHandler(transactionSchema, () => api.get(`${GET_TRANSACTION}/${id}`));

export const updateTransaction = async (
  id: string,
  data: CreateTransactionSchemaType,
) =>
  apiHandler(transactionSchema, () =>
    api.put(`${GET_TRANSACTION}/${id}`, data),
  );

export const getCashflow = async (duration: duration) =>
  apiHandler(cashflowSchema, () =>
    api.get(`${GET_CASHFLOW}?duration=${duration}`),
  );
