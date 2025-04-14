import "../NavBar/NavBar.css"
import logo from '../../img/logo.png';
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

const NavBar = ({showLogin, setShowLogin}) => {
  const toggleLogin = () => {
    setShowLogin(!showLogin)
    console.log(showLogin);
    
  }
  return (
    <Navbar expand="lg" className="custom-navbar px-3">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            alt="Logo"
            className="custom-logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#inicio">INICIO</Nav.Link>
            <Nav.Link href="#nosotros">NOSOTROS</Nav.Link>

            <NavDropdown title="ADOPCIÓN" id="dropdown-servicios">
              <NavDropdown.Item href="#servicio1">CONÓCELOS</NavDropdown.Item>
              <NavDropdown.Item href="#servicio2">QUIERO ADOPTAR</NavDropdown.Item>
              <NavDropdown.Item href="#servicio3">REQUISITOS DE ADOPCIÓN</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="MASCOTAS PERDIDAS" id="dropdown-productos">
              <NavDropdown.Item href="#producto1">PERDÍ MI MASCOTA</NavDropdown.Item>
              <NavDropdown.Item href="#producto2">ENCONTRÉ UNA MASCOTA</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="#donaciones">DONACIONES</Nav.Link>
            <Nav.Link href="#contacto">CONTACTO</Nav.Link>
          
          </Nav>

          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={toggleLogin}>INICIAR SESIÓN</Button>
            <Button variant="primary">REGISTRARSE</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;