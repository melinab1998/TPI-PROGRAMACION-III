import { useContext, useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { infoToast } from "../../utils/notifications.js"
import { AuthenticationContext } from "../../services/auth/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { userRole } = useContext(AuthenticationContext);
  const shownLoginToast = useRef(false);
  const shownDenyToast = useRef(false);

  useEffect(() => {
    if (!userRole && !shownLoginToast.current) {
      infoToast("Por favor, inicia sesión para continuar.");
      shownLoginToast.current = true;
    }
  }, [userRole]);

  if (!userRole) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    if (userRole === "user") {
      return <Navigate to="/not-found" replace />;
    }
    if (userRole === "admin" && !shownDenyToast.current) {
      infoToast("No tienes permiso para acceder a esta sección.");
      shownDenyToast.current = true;
    }
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;