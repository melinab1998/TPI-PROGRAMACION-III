import { useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../services/auth/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { userRole } = useContext(AuthenticationContext);
  const shownLoginToast = useRef(false);
  const shownDenyToast = useRef(false);
  
  useEffect(() => {
    if (!userRole && !shownLoginToast.current) {
      toast.info("Por favor, inicia sesión para continuar.");
      shownLoginToast.current = true;
    }
  }, [userRole]);


  useEffect(() => {
    if (userRole && !allowedRoles.includes(userRole) && !shownDenyToast.current) {
      toast.error("No tienes permiso para acceder a esta sección.");
      shownDenyToast.current = true;
    }
  }, [userRole, allowedRoles]);


  if (!userRole) {
    return (
      <Navigate
        to="/"
      />
    );
  }

  if (!allowedRoles.includes(userRole)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
