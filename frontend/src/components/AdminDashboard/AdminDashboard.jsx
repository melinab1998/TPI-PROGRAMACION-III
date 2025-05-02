import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  return (
    <Container className="mt-4">
      <h1 className="dashboard-title">Panel Administrador</h1>
      <Row className="mt-4">
        <Col md={4} sm={12}>
        <Card className="mb-4 custom-card stats-card">
  <Card.Body>
    <Card.Title className="card-title">📊 Estadísticas</Card.Title>
    <div className="stat-item">
      <span className="stat-number">25</span>
      <span className="stat-label">Mascotas en adopción</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">5</span>
      <span className="stat-label">Solicitudes pendientes</span>
    </div>
  </Card.Body>
</Card>
        </Col>
        <Col md={4} sm={12}>
          <Card className="mb-4 custom-card">
            <Card.Body>
              <Card.Title className="card-title">Gestión de Mascotas</Card.Title>
              <Card.Text className="card-sub">
                Administra las mascotas disponibles para adopción. Crea, edita o elimina registros de mascotas.
              </Card.Text>
              <Link to="/admin/mascotas">
                <Button className="btn-coral">Ir a Gestión</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card className="mb-4 custom-card">
            <Card.Body>
              <Card.Title className="card-title">Solicitudes de Adopción</Card.Title>
              <Card.Text className="card-sub">
                Gestiona las solicitudes de adopción pendientes. Acepta o rechaza solicitudes.
              </Card.Text>
              <Link to="/admin/solicitudes">
                <Button className="btn-coral">Ver Solicitudes</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;