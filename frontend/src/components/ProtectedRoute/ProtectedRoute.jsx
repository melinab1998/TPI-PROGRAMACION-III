import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
    
    const { isAuthenticated, userRole } = useContext(AuthenticationContext);

    const isAuthorized = allowedRoles ? allowedRoles.includes(userRole) : isAuthenticated;


    if (!isAuthorized) {
        return <Navigate to="/" state={{ showLogin: true }} replace />;
    }

    return children;
}

export default ProtectedRoute;