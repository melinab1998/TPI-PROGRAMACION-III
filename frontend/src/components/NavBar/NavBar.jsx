import "../NavBar/NavBar.css";
import logo from "../../img/logo.png";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { infoToast } from '../../utils/notifications.js';
import { AuthenticationContext } from "../../services/auth/AuthContext.jsx"

const NavBar = ({ toggleLogin }) => {
  const navigate = useNavigate();
  const { token, handleUserLogout } = useContext(AuthenticationContext);

  const handleLogout = () => {
    handleUserLogout(); // Usamos la función del contexto
    navigate("/", { state: { showLogin: true } });
    infoToast("Cerraste sesión con éxito");
  };

  return (
    <Navbar expand="lg" className="custom-navbar px-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="custom-logo" />
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

            <NavDropdown title="MASCOTAS PERDIDAS" id="dropdown-productos">
              <NavDropdown.Item as={Link} to="/lostlist">
                MASCOTAS PERDIDAS
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/lostform">
                PERDÍ MI MASCOTA
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
