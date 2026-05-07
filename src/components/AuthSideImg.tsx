import authImg from "@/assets/imgs/auth-1.jpg";
import { AUTH_PREFIX } from "@/data/routes.data";
import { useLocation } from "react-router-dom";

export default function AuthSideImg() {
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);

  if (!isAuthRoute) return null;

  return (
    <div className="w-1/2 min-w-[50vw] h-screen sticky top-0 left-0 max-lg:hidden">
      <img src={authImg} alt="Auth" className="w-full h-full object-cover" />
    </div>
  );
}
