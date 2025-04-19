import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light py-5 mt-5">
        <div className="container">
        <div className="row">

            <div className="col-md-3">
                <h5>Información</h5>
                <ul className="list-unstyled">
                    <li>Sobre nosotros</li>
                    <li>Medios de contacto</li>
                    <li>Aplicación móvil</li>
                    <li>¿Cómo ayudar?</li>
                </ul>
            </div>

            <div className="col-md-3">
                <h5>Términos y configuración</h5>
                <ul className="list-unstyled">
                    <li>Privacidad y cookies</li>
                    <li>Términos y condiciones</li>
                </ul>
            </div>

            <div className="col-md-3">
                <h5>Adopciones</h5>
                <ul className="list-unstyled">
                    <li>Requisitos</li>
                    <li>Testimonios</li>
                </ul>
            </div>

            <div className="col-md-3">
                <h5>Contacto</h5>
                <p>Contactanos para más información.</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <input type="email" className="form-control" placeholder="Ingrese su email" />
                        <button className="btn btn-primary" type="submit">Enviar</button>
                    </div>
                </form>
            </div>

    </div>

        <hr className="my-4" />
            <div className="text-center">
                <p className="mb-0">Copyright © 2025 - Mi Hogar.   Todos los derechos reservados</p>
            </div>
    </div>
    </footer>
);
};

export default Footer;