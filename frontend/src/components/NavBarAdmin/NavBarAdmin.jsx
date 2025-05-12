import "../NavBar/NavBar.css";
import logo from "../../img/logo.png";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBarAdmin = () => {
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

                        <Nav.Link as={Link} to="/petsmanagement">
                            GESTIÓN DE MASCOTAS
                        </Nav.Link>
                        <Nav.Link as={Link} to="">
                            SOLICITUDES DE ADOPCIÓN
                        </Nav.Link>
                    </Nav>
                    <div className="d-flex gap-2">
                        <Button variant="outline-primary">
                            CERRAR SESIÓN
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarAdmin;