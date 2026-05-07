import { BASE_URL } from "@/config/env";

export const POST_FORGOT_PASSWORD = "/auth/forgot-password";
export const GOOGLE_AUTH = `${BASE_URL}/auth/google`;
export const POST_LOGIN = "/auth/login";
export const POST_REGISTER = "/auth/register";
export const POST_RESET_PASSWORD = (token: string) =>
  `/auth/reset-password/${token}`;
export const GET_VERIFY_EMAIL = (otp: string) => `/auth/verify-email/${otp}`;
export const POST_VERIFY_EMAIL = `/auth/verify-email`;
export const AUTH_REFRESH_TOKEN = "/auth/refresh-token";
export const AUTH_LOGOUT = "/auth/logout";
