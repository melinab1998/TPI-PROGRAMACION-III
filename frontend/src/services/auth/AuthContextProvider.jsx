import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthenticationContext } from "./AuthContext";

export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(null);

    // cada vez que cambie el token, extraemos el rol
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded.role); // extraemos el rol del token
            } catch (error) {
                console.error("Token inválido", error);
                setUserRole(null);
            }
        } else {
            setUserRole(null);
        }
    }, [token]);

    const handleUserLogin = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const handleUserLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthenticationContext.Provider value={{ token, userRole, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};