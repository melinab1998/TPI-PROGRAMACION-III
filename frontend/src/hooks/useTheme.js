import { useContext } from "react";
import { ThemeContext } from "../services/theme/ThemeContext";

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme debe usarse dentro de ThemeContextProvider");
    }
    return context;
};

export default useTheme;