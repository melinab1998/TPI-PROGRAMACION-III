import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './DonationSection.css';
import donationImg from "../../img/donation-section.jpg"
import {Link} from "react-router-dom";

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
                        <Link to="/donation"><Button className="donation-button">Quiero ayudar</Button></Link> 
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default DonationSection;