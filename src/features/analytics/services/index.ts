import { GET_ANALYTICS } from "@/data/routes";
import api from "@/lib/api";
import { apiHandler } from "@/utils";
import type { duration } from "@/data/durations.data";
import { analyticsSchema } from "../schemas";

export const getAnalytics = async (duration: duration) =>
  apiHandler(analyticsSchema, () =>
    api.get(`${GET_ANALYTICS}?duration=${duration}`),
  );
