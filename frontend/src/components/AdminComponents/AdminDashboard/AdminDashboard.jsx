import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPaw, FaClipboardList, FaHeart } from "react-icons/fa";
import StatsDashboard from "../../StatsDashboard/StatsDashboard";


const AdminDashboard = () => {
    return (
        <Container className="admin-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Panel de Administración</h1>
                <p className="dashboard-subtitle">Gestión de mascotas y solicitudes de adopción</p>
            </div>

            <StatsDashboard />
            <Row className="management-cards">
                <Col md={6}>
                    <Card className="management-card pets-card">
                        <Card.Body>
                            <div className="card-icon-container">
                                <FaPaw className="card-icon" />
                            </div>
                            <Card.Title className="card-title-dash">Gestión de Mascotas</Card.Title>
                            <Card.Text className="card-text-dash">
                                Administra el listado completo de mascotas disponibles para adopción.
                                Agrega nuevas mascotas, edita información existente o actualiza su estado.
                            </Card.Text>
                            <Link to="/petsmanagement">
                                <Button className="primary-btn">Administrar Mascotas</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="management-card pets-card">
                        <Card.Body>
                            <div className="card-icon-container">
                                <FaClipboardList className="card-icon" />
                            </div>
                            <Card.Title className="card-title-dash">Solicitudes de Adopción</Card.Title>
                            <Card.Text className="card-text-dash">
                                Revisa y gestiona todas las solicitudes de adopción. Aprueba solicitudes,
                                programa entrevistas y realiza seguimiento del proceso de adopción.
                            </Card.Text>
                            <Link to="/requestsmanagement">
                                <Button className="primary-btn">Ver Solicitudes</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;