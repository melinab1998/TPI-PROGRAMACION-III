import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import footerLogo from "../../img/logo.png";
import footerLogoDark from "../../img/logo-dark-theme.png"
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme"

const Footer = () => {

    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <footer className={`py-5 custom-footer ${isDark ? "footer-dark" : "footer-light"}`}>
            <Container>
                <Row className="text-center text-md-start align-items-stretch h-100">
                    <Col md={4} className="d-flex flex-column align-items-center justify-content-center text-center h-100">
                        <h5 className="custom-title">Información</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/contact" className="links-footer">Medios de contacto</a>
                            </li>
                            <li>
                                <Link to="/app-movil" className="links-footer">Aplicación móvil</Link>
                            </li>
                            <li>
                                <a href="donation" className="links-footer">¿Cómo ayudar?</a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={4} className="d-flex flex-column align-items-center text-center h-100 my-4 my-md-0">
                        <img src={isDark ? footerLogoDark : footerLogo} alt="Mi Hogar Logo" width={80} />
                        <div className="mt-3 d-flex justify-content-center gap-3">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <FaFacebook size={40} />
                            </a>
                            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                                <BsTwitterX size={40} color={isDark ? "white" : "black"} />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={40} color="E1306C" />
                            </a>
                        </div>
                    </Col>

                    <Col md={4} className="d-flex flex-column align-items-center justify-content-center text-center h-100 ">
                        <h5 className="custom-title">Términos y configuración</h5>
                        <ul className="list-unstyled">

                            <li>
                                <Link to="/privacy-notice" className="links-footer">Aviso de privacidad</Link>
                            </li>
                            <li>
                                <Link to="/cookies-notice" className="links-footer">Aviso de cookies</Link>
                            </li>
                            <li>
                                <Link to="/terms-conditions" className="links-footer">Términos y condiciones</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <hr className="my-4" />

                <div className="text-center small copyright-text">
                    © 2025 - Mi Hogar. Todos los derechos reservados.
                </div>
            </Container>
        </footer>
    );
};
export default Footer;

