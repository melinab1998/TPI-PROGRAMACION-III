import { useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../services/auth/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { userRole } = useContext(AuthenticationContext);
  const shownLoginToast = useRef(false);
  const shownDenyToast = useRef(false);

  // Si no está logueado  mostrar toast e ir a login
  useEffect(() => {
    if (!userRole && !shownLoginToast.current) {
      toast.info("Por favor, inicia sesión para continuar.");
      shownLoginToast.current = true;
    }
  }, [userRole]);

  if (!userRole) {
    return <Navigate to="/"  />;
  }

  // Si está logueado pero su rol no está permitido
  if (!allowedRoles.includes(userRole)) {
    // Si es un usuario común  redirigir a /not-found 
    if (userRole === "user") {
      return <Navigate to="/not-found" replace />;
    }

    // Si es admin  mostrar toast una sola vez, pero no redirigir
    if (userRole === "admin" && !shownDenyToast.current) {
      toast.error("No tienes permiso para acceder a esta sección.");
      shownDenyToast.current = true;
    }

    // No mostrar nada (ni redirigir), solo el toast del admin
    return null;
  }

  // Tiene permisos  renderiza el contenido
  return children;
};

export default ProtectedRoute;

