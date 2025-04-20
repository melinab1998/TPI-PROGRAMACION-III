import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "../AboutUs/AboutUs.css"
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <section className="about-us-section py-5" id="about-us">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="mb-4 mb-md-0 about-us-info">
                        <h2 className="fw-bold mb-3 about-us-title">Sobre nosotros</h2>
                        <p className="mb-3 about-us-p">
                            Somos un grupo de personas comprometidas con mejorar la vida de perros y gatos en situación vulnerable.
                        </p>
                        <p className="mb-4 about-us-p">
                            Creamos esta plataforma para fomentar la adopción responsable y ayudar a reencontrar mascotas perdidas con sus familias.
                        </p>
                        <Link to="/contact"><Button variant="outline-dark" className="custom-btn-contactanos">
                            Contactanos
                        </Button></Link>
                    </Col>
                    <Col md={6}>
                        <Row className="g-4">
                            <Col xs={6}>
                                <div className="icon-box text-center">
                                    <i className="bi bi-house-heart-fill icon-style"></i>
                                    <h6 className="mt-2 fw-semibold">Adopciones</h6>
                                    <p className="small">Un lugar donde perros y gatos esperan su familia ideal.</p>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="icon-box text-center">
                                    <i className="bi bi-search-heart icon-style"></i>
                                    <h6 className="mt-2 fw-semibold">Mascotas perdidas</h6>
                                    <p className="small">Conectamos personas con sus mascotas extraviadas o encontradas.</p>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="icon-box text-center">
                                    <i className="bi bi-people-fill icon-style"></i>
                                    <h6 className="mt-2 fw-semibold">Comunidad</h6>
                                    <p className="small">Una red de personas solidarias que se ayudan entre sí por los animales.</p>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="icon-box text-center">
                                    <i className="bi bi-heart-fill icon-style"></i>
                                    <h6 className="mt-2 fw-semibold">Compromiso</h6>
                                    <p className="small">Trabajamos con amor y respeto por cada vida que lo necesita.</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default AboutUs;