import { AUTH_LOGOUT } from "@/data/routes";
import api from "@/lib/api";
import { useAuth } from "@/stores";
import { useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const { clearUser } = useAuth();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      const { data } = await api.post(AUTH_LOGOUT);
      const { success } = data;
      if (!success) {
        throw new Error("Logout failed");
      }
      clearUser();
      queryClient.clear();
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return { logout };
}
