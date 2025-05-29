import { Container, Row, Col, Button } from 'react-bootstrap';
import './DonationSection.css';
import donationImg from "../../img/donation-section.jpg"
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const fadeInLeft = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { opacity: 1, scale: 1 }
}

const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
}


const DonationSection = () => {
    return (
        <section className="donation-section">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <motion.img
                            src={donationImg}
                            alt="Imagen de donacion"
                            className="donation-image"
                            variants={fadeInLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                        >
                        </motion.img>
                    </Col>
                    <Col md={6}>
                        <motion.h2
                            className='donation-title'
                            variants={fadeInRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            Tu apoyo hace la diferencia
                        </motion.h2>
                        <motion.p
                            className='donation-section-text'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            Cada contribución nos ayuda a rescatar, alimentar y dar atención veterinaria a mascotas necesitadas.  Con tu donación podemos seguir conectando animales con familias amorosas y mantener esta comunidad solidaria.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 1.2 }}
                        >

                            <Link to="/donation"><Button className="donation-button">Quiero ayudar</Button></Link>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default DonationSection;