import "../NavBar/NavBar.css";
import logo from "../../img/logo.png";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = ({ toggleLogin }) => {
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
            <Nav.Link href="/#about-us">NOSOTROS</Nav.Link>

            <NavDropdown title="ADOPCIÓN" id="dropdown-servicios">
              <NavDropdown.Item as={Link} to = "/meet">CONÓCELOS</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/adoption-form">
                QUIERO ADOPTAR
              </NavDropdown.Item>
              <NavDropdown.Item href="/#adoption-section">
                REQUISITOS DE ADOPCIÓN
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="MASCOTAS PERDIDAS" id="dropdown-productos">
              <NavDropdown.Item href="#producto1">
                PERDÍ MI MASCOTA
              </NavDropdown.Item>
              <NavDropdown.Item href="#producto2">
                ENCONTRÉ UNA MASCOTA
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
            <Button variant="outline-primary" onClick={toggleLogin}>
              INICIAR SESIÓN
            </Button>
            <Link to="/register">
              <Button variant="primary">REGISTRARSE</Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
