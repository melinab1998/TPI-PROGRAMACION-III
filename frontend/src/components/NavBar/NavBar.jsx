import "../NavBar/NavBar.css";
import logo from "../../img/logo.png";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { infoToast } from '../../utils/notifications.js';
import { AuthenticationContext } from "../../services/auth/AuthContext.jsx";
import useTheme from "../../hooks/useTheme.jsx"
import { FaSun, FaMoon } from "react-icons/fa";
import logoDark from "../../img/logo-dark-theme.png"

const NavBar = ({ toggleLogin }) => {
  const navigate = useNavigate();
  const { token, handleUserLogout, userRole } = useContext(AuthenticationContext);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleLogout = () => {
    handleUserLogout();
    navigate("/", { state: { showLogin: true } });
    infoToast("Cerraste sesión con éxito");
  };

  // Definimos una clase para aplicar tema claro/oscuro solo al navbar
  const themeClass = isDark ? "navbar-dark bg-dark" : "navbar-light bg-light";

  // NavBar para administradores
  if (userRole === "admin") {
    return (
      <Navbar expand="lg" className={`custom-navbar px-3 ${themeClass}`}>
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={isDark ? logoDark : logo} alt="Logo" className="custom-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                INICIO
              </Nav.Link>
              <Nav.Link as={Link} to="/petsmanagement">
                GESTIÓN DE MASCOTAS
              </Nav.Link>
              <Nav.Link as={Link} to="/requestsmanagement">
                SOLICITUDES DE ADOPCIÓN
              </Nav.Link>
            </Nav>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={toggleTheme} className="theme-toggle-btn">
                {isDark ? <FaSun /> : <FaMoon />}
              </Button>
              <Button variant="outline-primary" onClick={handleLogout}>
                CERRAR SESIÓN
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else if (userRole === "superadmin") {
    return (
      <Navbar expand="lg" className={`custom-navbar px-3 ${themeClass}`}>
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={isDark ? logoDark : logo} alt="Logo" className="custom-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                INICIO
              </Nav.Link>
              <Nav.Link as={Link} to="/requestsmanagement">
                SOLICITUDES DE ADOPCIÓN
              </Nav.Link>
              <NavDropdown title="GESTIÓN" id="management-dropdown">
                <NavDropdown.Item as={Link} to="/petsmanagement">
                  GESTIÓN DE MASCOTAS
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/usersmanagement">
                  GESTIÓN DE USUARIOS
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sheltersmanagement">
                  GESTIÓN DE REFUGIOS
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={toggleTheme} className="theme-toggle-btn">
                {isDark ? <FaSun /> : <FaMoon />}
              </Button>
              <Button variant="outline-primary" onClick={handleLogout}>
                CERRAR SESIÓN
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  // NavBar para usuarios normales
  return (
    <Navbar expand="lg" className={`custom-navbar px-3 ${themeClass}`}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={isDark ? logoDark : logo} alt="Logo" className="custom-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              INICIO
            </Nav.Link>
            <Nav.Link as={HashLink} smooth to="/#about-us">NOSOTROS</Nav.Link>

            <NavDropdown title="ADOPCIÓN" id="dropdown-servicios">
              <NavDropdown.Item as={Link} to="/pets">CONÓCELOS</NavDropdown.Item>
              <NavDropdown.Item as={HashLink} smooth to="/#adoption-section">
                REQUISITOS DE ADOPCIÓN
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/donation">
              DONACIONES
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              CONTACTO
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={toggleTheme} className="theme-toggle-btn">
              {isDark ? <FaSun /> : <FaMoon />}
            </Button>
            {!token ? (
              <>
                <Button variant="outline-primary" onClick={toggleLogin}>
                  INICIAR SESIÓN
                </Button>
                <Link to="/register">
                  <Button variant="primary">REGISTRARSE</Button>
                </Link>
              </>
            ) : (
              <Button variant="outline-primary" onClick={handleLogout}>
                CERRAR SESIÓN
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;