import { GET_BALANCE } from "@/data/routes";
import api from "@/lib/api";
import { apiHandler } from "@/utils/function/apiHandler";
import { balanceSchema } from "../schemas/balance.schema";

export const getBalanceRequest = async () =>
  apiHandler(balanceSchema, () => api.get(GET_BALANCE));
