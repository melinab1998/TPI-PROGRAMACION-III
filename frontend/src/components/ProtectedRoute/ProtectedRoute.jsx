import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth/AuthContext";
import { infoToast } from "../../utils/notifications.js"

function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, userRole } = useContext(AuthenticationContext);
    const location = useLocation();

    const isAuthorized = allowedRoles ? allowedRoles.includes(userRole) : isAuthenticated;

    useEffect(() => {
        if (!isAuthenticated && location.pathname.startsWith("/adoption/")) {
            const toastShown = sessionStorage.getItem("toastShown");
            if (!toastShown || toastShown !== location.pathname) {
                infoToast("Para completar un formulario de adopción debes iniciar sesión");
                sessionStorage.setItem("toastShown", location.pathname);
            }
        } else {
            sessionStorage.removeItem("toastShown");
        }
    }, [isAuthenticated, location]);

    if (!isAuthorized) {
        return <Navigate to="/" state={{ showLogin: true }} replace />;
    }

    return children;
}

export default ProtectedRoute;