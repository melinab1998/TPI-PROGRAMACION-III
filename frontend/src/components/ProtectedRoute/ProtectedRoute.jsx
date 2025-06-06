import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { infoToast } from "../../utils/notifications.js";
import { AuthenticationContext } from "../../services/auth/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { userRole } = useContext(AuthenticationContext);
  const shownLoginToast = useRef(false);
  const shownDenyToast = useRef(false);
  const [wasLoggedIn, setWasLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole) {
      setWasLoggedIn(true);
    }
  }, [userRole]);

  useEffect(() => {
    if (!userRole && !shownLoginToast.current && !wasLoggedIn) {
      infoToast("Por favor, inicia sesión para continuar.");
      shownLoginToast.current = true;
      localStorage.setItem("redirectAfterLogin", location.pathname + location.search);
      navigate("/", { state: { showLogin: true } });
    }
  }, [userRole, wasLoggedIn]);

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
