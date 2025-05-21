// src/components/ProtectedRoute/ProtectedRoute.jsx
import { useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../services/auth/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { userRole } = useContext(AuthenticationContext);
  const shownLoginToast = useRef(false);
  const shownDenyToast = useRef(false);
  

  // Toast para usuario no logueado
  useEffect(() => {
    if (!userRole && !shownLoginToast.current) {
      toast.info("Por favor, inicia sesión para continuar.");
      shownLoginToast.current = true;
    }
  }, [userRole]);

  // Toast para rol sin permisos
  useEffect(() => {
    if (userRole && !allowedRoles.includes(userRole) && !shownDenyToast.current) {
      toast.error("No tienes permiso para acceder a esta sección.");
      shownDenyToast.current = true;
    }
  }, [userRole, allowedRoles]);

  // Si no está logueado, redirige al login (asume que en "/" usás state.showLogin)
  if (!userRole) {
    return (
      <Navigate
        to="/"
      />
    );
  }

  // Si está logueado pero no autorizado, no renderiza nada (solo el toast ya salió)
  if (!allowedRoles.includes(userRole)) {
    return null;
  }

  // Si está autorizado, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
