import { Container, Button } from "react-bootstrap";
import "../HeroSection/HeroSection.css"

const HeroSection = () => {
  return (
    <div className="hero-section d-flex align-items-center">
      <Container className="text-white text-center">
        <h1 className="display-3 fw-bold">Encontrá a tu mejor amigo</h1>
        <p className="lead">
          El amor no se compra, se adopta.
        </p>
        <Button className="btn-adopta">
          ADOPTÁ
        </Button>
      </Container>
    </div>
  );
};

export default HeroSection;