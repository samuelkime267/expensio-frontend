import { useEffect } from "react";
import { BACKEND_URL } from "@/config/env";
import { DEFAULT_REDIRECT_ROUTE } from "@/data/routes.data";
import { GOOGLE_AUTH } from "@/data/routes";

export default function useOAuth(
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
  const loginWithGoogle = async () => {
    setError(undefined);
    window.open(GOOGLE_AUTH, "_blank", "width=500,height=600");
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      console.log(event);
      console.log(BACKEND_URL);
      if (event.origin !== BACKEND_URL) return;
      if (event.data.from === "oauth") {
        if (event.data.success) {
          window.location.href = DEFAULT_REDIRECT_ROUTE;
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
