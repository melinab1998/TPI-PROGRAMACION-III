import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import footerLogo from "../../img/logo.png";
import facebookIcon from "../../img/facebook-icon.svg";
import instagramIcon from "../../img/instagram-icon.svg";
import whatsappIcon from "../../img/whatsapp-icon.svg";

const Footer = () => {
    return (
    <footer className="bg-light py-5 mt-5 border-top">
        <Container>
        <Row className="text-center text-md-start">
            <Col md={4} className="d-flex flex-column align-items-center justify-content-center text-center">
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

            <Col md={4} className="d-flex flex-column align-items-center justify-content-center text-center my-4 my-md-0">
            <img src={footerLogo} alt="Mi Hogar Logo" style={{ width: "80px" }} />
            <div className="mt-3 d-flex justify-content-center gap-3">
                <a href="#">
                <img src={facebookIcon} alt="Facebook" width="24" />
                </a>
                <a href="#">
                <img src={instagramIcon} alt="Instagram" width="24" />
                </a>
                <a href="#">
                <img src={whatsappIcon} alt="WhatsApp" width="24" />
                </a>
            </div>
            </Col>

            <Col md={4} className="d-flex flex-column align-items-center justify-content-center text-center my-10">
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
