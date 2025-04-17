import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './DonationSection.css';
import donationImg from "../../img/donation-section.jpg"

const DonationSection = () => {
    return (
        <section className="donation-section">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img
                            src={donationImg}
                            alt=""
                            className="donation-image"
                        />
                    </Col>
                    <Col md={6}>
                        <h2 className="donation-title">Tu apoyo hace la diferencia</h2>
                        <p className="donation-text">
                            Cada contribución nos ayuda a rescatar, alimentar y dar atención veterinaria a mascotas necesitadas.  Con tu donación podemos seguir conectando animales con familias amorosas y mantener esta comunidad solidaria.
                        </p>
                        <Button className="donation-button">Quiero ayudar</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default DonationSection;