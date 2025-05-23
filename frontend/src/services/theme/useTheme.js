import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme debe usarse dentro de ThemeContextProvider");
    }
    return context;
};

export default useTheme;