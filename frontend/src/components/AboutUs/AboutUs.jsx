import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "../AboutUs/AboutUs.css";

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.9 }
  })
};

const features = [
  {
    icon: "bi bi-house-heart-fill",
    title: "Adopciones",
    description: "Un lugar donde perros y gatos esperan su familia ideal."
  },
  {
    icon: "bi bi-search-heart",
    title: "Mascotas perdidas",
    description: "Conectamos personas con sus mascotas extraviadas o encontradas."
  },
  {
    icon: "bi bi-people-fill",
    title: "Comunidad",
    description: "Una red de personas solidarias que se ayudan entre sí por los animales."
  },
  {
    icon: "bi bi-heart-fill",
    title: "Compromiso",
    description: "Trabajamos con amor y respeto por cada vida que lo necesita."
  }
];

const AboutUs = () => {
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcons(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="about-us-section py-5" id="about-us">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0 about-us-info">
            <motion.h2
              className="fw-bold mb-3 about-us-title"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              Sobre nosotros
            </motion.h2>

            <motion.p
              className="mb-3 about-us-p"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1.5 }}
            >
              Somos un grupo de personas comprometidas con mejorar la vida de perros y gatos en situación vulnerable.
            </motion.p>

            <motion.p
              className="mb-4 about-us-p"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 1.5 }}
            >
              Creamos esta plataforma para fomentar la adopción responsable y ayudar a reencontrar mascotas perdidas con sus familias.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.7, duration: 1.2 }}
            >
              <Link to="/contact">
                <Button variant="outline-dark" className="custom-btn-contact">
                  Contactanos
                </Button>
              </Link>
            </motion.div>
          </Col>

          <Col md={6}>
            {showIcons && (
              <Row className="g-4">
                {features.map((feature, i) => (
                  <Col xs={6} key={i}>
                    <motion.div
                      className="icon-box text-center"
                      variants={fadeInUp}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <i className={`${feature.icon} icon-style`}></i>
                      <h6 className="mt-2 fw-semibold">{feature.title}</h6>
                      <p className="small">{feature.description}</p>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
