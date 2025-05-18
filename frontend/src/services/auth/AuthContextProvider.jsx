import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthenticationContext } from "./AuthContext";

export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    // cada vez que cambie el token, extraemos el rol
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded.role); // extraemos el rol del token
                setUserId(decoded.id_user)

            } catch (error) {
                console.error("Token inválido", error);
                setUserRole(null);
                setUserId(null)
            }
        } else {
            setUserRole(null);
            setUserId(null)
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
        <AuthenticationContext.Provider value={{ token, userRole, userId, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};