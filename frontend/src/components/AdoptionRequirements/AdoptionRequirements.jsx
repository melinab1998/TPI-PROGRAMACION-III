import { Container, Row, Col } from 'react-bootstrap';
import { FiCheckCircle } from 'react-icons/fi';
import './AdoptionRequirements.css';
import {  motion } from 'framer-motion';

const AdoptionRequirements = () => {
    const requirements = [
      "Ser mayor de 21 años",
      "Contar con un espacio adecuado y seguro",
      "Aceptar una visita previa de evaluación",
      "Firma de contrato de adopción responsable",
      "Compromiso de esterilización",
      "Brindar atención veterinaria y amor constante"
    ];

const fadeInDowm = {
  hidden: {opacity: 0, y: -50},
  visible: {opacity: 1, y: 0}
}

const fadeInCascade = {
  hidden: {opacity: 0, y: 20},
  visible: (i = 1) => ({
    opacity:1,
    y: 0,
    transition:{delay: i * 0.2, duration:0.8}
  })
}
  
    return (
      <section className="adoption-section" id="adoption-section">
        <Container>
          <motion.h2
          className="adoption-title"
          variants={fadeInDowm}
          initial = "hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 2.5 }}  
          >
            Requisitos de adopción
          </motion.h2>
          <motion.p
          className="adoption-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1.5 }} 
          >
          Estos son los criterios esenciales para ofrecerle un hogar seguro y amoroso.
          </motion.p>
          <Row className="justify-content-center">
  {requirements.map((req, idx) => (
    <Col key={idx} xs={12} md={6} lg={4} className="mb-4">
      <motion.div
        variants={fadeInCascade}
        custom={idx}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="requirement-item">
          <div className="requirement-circle">
            <FiCheckCircle className="requirement-icon" />
          </div>
          <span className="requirement-text">{req}</span>
        </div>
      </motion.div>
    </Col>
  ))}
</Row>

        </Container>
      </section>
    );
  };

export default AdoptionRequirements;