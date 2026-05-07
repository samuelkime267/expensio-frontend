export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password/:token",
];

export const authVerificationRoutes = ["/auth/verify-email"];

export const publicRoutes = ["/"];

export const adminRoutePrefix = "/admin";

export const DEFAULT_REDIRECT_ROUTE = "/creator/stream";
export const DEFAULT_AUTH_REDIRECT_ROUTE = "/auth/login";
export const AUTH_PREFIX = "/auth";
export const CREATOR_STREAM_ROUTE = "/creator/stream";
