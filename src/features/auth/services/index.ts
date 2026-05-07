import { POST_LOGIN, POST_REGISTER } from "@/data/routes";
import {
  LoginResponseSchema,
  type LoginSchemaType,
  type RegisterSchemaType,
} from "../schemas";
import api from "@/lib/api";
import { apiHandler } from "@/utils/function/apiHandler";

export const loginRequest = async (body: LoginSchemaType) =>
  apiHandler(LoginResponseSchema, () => api.post(POST_LOGIN, body));

export const registerRequest = async (body: RegisterSchemaType) =>
  apiHandler(LoginResponseSchema, () => api.post(POST_REGISTER, body));
