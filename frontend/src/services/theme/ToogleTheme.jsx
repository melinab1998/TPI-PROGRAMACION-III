import { Button } from "react-bootstrap";
import { LIGHT_THEME } from "../../services/consts";
import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "../../hooks/useTheme"

const ToggleTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} variant="outline-secondary">
            {theme === LIGHT_THEME ? <FaMoon /> : <FaSun />}
        </Button>
    );
};

export default ToggleTheme;