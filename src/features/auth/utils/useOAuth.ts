import { useEffect } from "react";
import { BACKEND_URL } from "@/config/env";
import { DEFAULT_REDIRECT_ROUTE } from "@/data/routes.data";
import { AUTH_REFRESH_TOKEN, GOOGLE_AUTH } from "@/data/routes";
import { useAuth } from "@/stores";
import api from "@/lib/api";

export default function useOAuth(
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
  const { setToken } = useAuth((s) => s);
  const loginWithGoogle = async () => {
    setError(undefined);
    window.open(GOOGLE_AUTH, "_blank", "width=500,height=600");
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== BACKEND_URL) return;
      if (event.data.from === "oauth") {
        if (event.data.success) {
          const { data } = await api.post(AUTH_REFRESH_TOKEN);
          console.log("OAuth success:", data);
          setToken(data.data.accessToken);
          // window.location.href = DEFAULT_REDIRECT_ROUTE;
          return;
        }
        console.log("OAuth error:", event.data.error);
        setError(event.data.message);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setError]);

  return {
    loginWithGoogle,
  };
}
