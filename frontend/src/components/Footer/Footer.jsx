import React from 'react';
import './Footer.css';
import logo from '../../img/logo.png';
import facebookIcon from '../../img/facebook-icon.svg';
import instagramIcon from '../../img/instagram-icon.svg';
import whatsappIcon from '../../img/whatsapp-icon.svg';

const Footer = () => {
    return (
        <footer className="bg-light py-5 mt-5">
            <div className="container">
            <div className="row text-center text-md-start align-items-center"> 
    <div className="col-md-4 text-center mb-4 mb-md-0">
        <h5 className="text-danger">Información</h5>
        <ul className="list-unstyled">
            <li><a href="#about-us" className="links-footer">Sobre nosotros</a></li>
            <li><a href="#" className="links-footer">Medios de contacto</a></li>
            <li><a href="#" className="links-footer">Aplicación móvil</a></li>
            <li><a href="#" className="links-footer">¿Cómo ayudar?</a></li>
        </ul>
    </div>


                    <div className="col-md-4 text-center mb-4 mb-md-0">
                        <img src={logo} alt="Mi Hogar Logo" style={{ maxWidth: '80px' }} />
                        <div className="mt-3">
                            <a href="#"><img src={facebookIcon} alt="Facebook" className="mx-2" style={{ width: '24px' }} /></a>
                            <a href="#"><img src={instagramIcon} alt="Instagram" className="mx-2" style={{ width: '24px' }} /></a>
                            <a href="#"><img src={whatsappIcon} alt="WhatsApp" className="mx-2" style={{ width: '24px' }} /></a>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mb-4 mb-md-0">
                        <h5 className="text-danger">Términos y configuración</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="links-footer">Privacidad y cookies</a></li>
                            <li><a href="#" className="links-footer">Términos y condiciones</a></li>
                        </ul>
                    </div>
                </div>

                <hr />
                <div className="text-center mt-3">
                    <p className="mb-0">Copyright © 2025 - Mi Hogar. Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;