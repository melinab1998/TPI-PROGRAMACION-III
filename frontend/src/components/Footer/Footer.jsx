import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import footerLogo from "../../img/logo.png";
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="py-5 border-top custom-footer">
            <Container>
            <Row className="text-center text-md-start align-items-start">
            <Col md={4} className="d-flex flex-column align-items-center text-center h-100">
                <h5 className="text-danger">Información</h5>
                <ul className="list-unstyled">
                    <li>
                    <a href="#" className="links-footer">Sobre nosotros</a>
                    </li>
                    <li>
                    <a href="#" className="links-footer">Medios de contacto</a>
                    </li>
                    <li>
                    <a href="#"className="links-footer">Aplicación móvil</a>
                    </li>
                    <li>
                    <a href="#"className="links-footer">¿Cómo ayudar?</a>
                    </li>
                </ul>
                </Col>
    
                <Col md={4} className="d-flex flex-column align-items-center text-center h-100 my-4 my-md-0">
                <img src={footerLogo} alt="Mi Hogar Logo" style={{ width: "80px" }} />
                <div className="mt-3 d-flex justify-content-center gap-3">
                    <a href="#">
                        <FaFacebook size={40} />
                    </a>
                    <a href="#">
                    <BsTwitterX size={40} color="black" />
                    </a>
                    <a href="#">
                    <FaInstagram size={40} color="E1306C" />
                    </a>
                </div>
                </Col>
    
                <Col md={4} className="d-flex flex-column align-items-center text-center h-100">
                <h5 className="text-danger">Términos y configuración</h5>
                <ul className="list-unstyled">
                <li>
                    <a href="#"className="links-footer">Privacidad y cookies</a>
                </li>
                <li>
                    <a href="#" className="links-footer">Términos y condiciones</a>
                </li>
                </ul>
                </Col>
            </Row>
    
            <hr className="my-4" />
    
            <div className="text-center text-muted small">
                © 2025 - Mi Hogar. Todos los derechos reservados.
            </div>
            </Container>
        </footer>
        );
    };
export default Footer;

