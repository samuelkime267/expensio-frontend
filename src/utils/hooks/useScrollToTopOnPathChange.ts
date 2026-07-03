import React from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTopOnPathChange() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
}
