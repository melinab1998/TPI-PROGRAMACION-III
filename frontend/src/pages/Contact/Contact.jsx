import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contact.css';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  return (
    <section className="contacto-section">
      <Container>
        <Row>
          <Col md={6} className="contacto-info">
            <h2 className="contacto-titulo">Contáctanos</h2>
            <h4 className="contacto-subtitulo">¿Cómo podemos ayudarte?</h4>
            <p className="contacto-texto">
              Si tenés alguna consulta, querés colaborar o simplemente hablarnos, estamos para escucharte. 
              Completá el formulario o escribinos por nuestras redes sociales:
            </p>
            <div className="contacto-redes">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaXTwitter /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </Col>

          <Col md={6}>
            <Form className="contacto-formulario">
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tu nombre" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="nombre@email.com" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribí tu mensaje..." />
              </Form.Group>

              <Button className="contacto-boton" type="submit">
                Contactar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;