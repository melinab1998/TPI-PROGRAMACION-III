import { Container, Button } from "react-bootstrap";
import "../HeroSection/HeroSection.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="hero-section d-flex align-items-center">
      <Container className="text-white text-center">
        <motion.h1
          className="display-3 fw-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Encontrá a tu mejor amigo
        </motion.h1>

        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          El amor no se compra, se adopta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link to="/pets">
            <Button className="btn-adopta">ADOPTÁ</Button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
};

export default HeroSection;
