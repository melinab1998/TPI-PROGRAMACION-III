import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../services/theme/ThemeContext";
import { LIGHT_THEME } from "../../services/consts";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button onClick={toggleTheme} variant="outline-secondary">
            {theme === LIGHT_THEME ? <FaMoon /> : <FaSun />}
        </Button>
    );
};

export default ToggleTheme;