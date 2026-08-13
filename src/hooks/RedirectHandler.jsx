import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.__redirectTo) {
      const path = window.__redirectTo;
      delete window.__redirectTo;
      // Заменяем историю, чтобы при возврате не было багов
      navigate(path, { replace: true });
    }
  }, [navigate]);

  return null;
}
