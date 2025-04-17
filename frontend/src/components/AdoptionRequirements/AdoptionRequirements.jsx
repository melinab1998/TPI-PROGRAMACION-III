import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiCheckCircle } from 'react-icons/fi';
import './AdoptionRequirements.css';

const AdoptionRequirements = () => {
    const requirements = [
      "Ser mayor de 21 años",
      "Contar con un espacio adecuado y seguro",
      "Aceptar una visita previa de evaluación",
      "Firma de contrato de adopción responsable",
      "Compromiso de esterilización",
      "Brindar atención veterinaria y amor constante"
    ];
  
    return (
      <section className="adoption-section" id="adoption-section">
        <Container>
          <h2 className="adoption-title">Requisitos de adopción</h2>
          <p className="adoption-subtitle">Estos son los criterios esenciales para ofrecerle un hogar seguro y amoroso.</p>
          <Row className="justify-content-center">
            {requirements.map((req, idx) => (
              <Col key={idx} xs={12} md={6} lg={4} className="mb-4">
                <div className="requisito-item">
                  <div className="requisito-circle">
                    <FiCheckCircle className="requisito-icono" />
                  </div>
                  <span className="requisito-texto">{req}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  };

export default AdoptionRequirements;