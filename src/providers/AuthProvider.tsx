import { AUTH_REFRESH_TOKEN, GET_ME } from "@/data/routes";
import {
  authRoutes,
  authVerificationRoutes,
  DEFAULT_AUTH_REDIRECT_ROUTE,
  DEFAULT_REDIRECT_ROUTE,
  publicRoutes,
} from "@/data/routes.data";
import api from "@/lib/api";
import { useAuth } from "@/stores";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useEffect, useLayoutEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

interface AxiosConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setIsLoading, setToken, token, id, setUserDataError, setUser } =
    useAuth((s) => s);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.post(AUTH_REFRESH_TOKEN);
        setToken(data.data.accessToken);
      } catch (error) {
        console.log(error);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [setToken, setIsLoading]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !id) {
        try {
          const {
            data: { data },
          } = await api.get(GET_ME);
          setUser({
            id: data._id,
            name: data.name,
            email: data.email,
            profilePicture: data.profilePicture,
            authProvider: data.authProvider,
            username: data.username,
          });
          setUserDataError(false);
        } catch {
          setUserDataError(true);
        }
      }
    };

    fetchUser();
  }, [id, token, setUserDataError, setUser]);

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config: AxiosConfig) => {
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;

        return config;
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosConfig;

        if (!originalRequest) return Promise.reject(error);

        if (originalRequest.url === AUTH_REFRESH_TOKEN)
          return Promise.reject(error);

        if (
          error.status === 401 &&
          (error.response?.data as { message: string })?.message ===
            "User not authenticated"
        ) {
          try {
            const { data } = await api.post(AUTH_REFRESH_TOKEN);
            setToken(data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            originalRequest._retry = true;
            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [setToken]);

  useLayoutEffect(() => {
    const isPublicRoute = publicRoutes.some((route) =>
      matchPath({ path: route, end: true }, pathname),
    );

    const isAuthRoute = authRoutes.some((route) =>
      matchPath({ path: route, end: true }, pathname),
    );

    const isAuthVerificationRoute = authVerificationRoutes.some((route) =>
      matchPath({ path: route, end: true }, pathname),
    );

    if (token === undefined) return;
    if (isAuthRoute && !token) return;
    if (token === null && !isPublicRoute) {
      navigate(DEFAULT_AUTH_REDIRECT_ROUTE);
      return;
    }

    if (token && isAuthVerificationRoute) return;

    if (token && isAuthRoute) {
      navigate(DEFAULT_REDIRECT_ROUTE);
    }
  }, [token, pathname, navigate]);

  return <>{children}</>;
}
