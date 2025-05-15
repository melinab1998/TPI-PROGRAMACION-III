import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPaw, FaClipboardList, FaHeart } from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const stats = [
        { value: 25, label: "Mascotas en adopción", icon: <FaPaw /> },
        { value: 5, label: "Solicitudes pendientes", icon: <FaClipboardList /> },
        { value: 42, label: "Adopciones exitosas", icon: <FaHeart /> }
    ];

    return (
        <Container className="admin-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Panel de Administración</h1>
                <p className="dashboard-subtitle">Gestión de mascotas y solicitudes de adopción</p>
            </div>

            <Row className="stats-row">
                {stats.map((stat, index) => (
                    <Col md={4} key={index}>
                        <Card className="stat-card">
                            <Card.Body>
                                <div className="stat-icon">
                                    {stat.icon}
                                </div>
                                <div className="stat-content">
                                    <span className="stat-number">{stat.value}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="management-cards">
                <Col md={6}>
                    <Card className="management-card pets-card">
                        <Card.Body>
                            <div className="card-icon-container">
                                <FaPaw className="card-icon" />
                            </div>
                            <Card.Title className="card-title">Gestión de Mascotas</Card.Title>
                            <Card.Text className="card-text">
                                Administra el listado completo de mascotas disponibles para adopción.
                                Agrega nuevas mascotas, edita información existente o actualiza su estado.
                            </Card.Text>
                            <Link to="">
                                <Button className="primary-btn">Administrar Mascotas</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="management-card requests-card">
                        <Card.Body>
                            <div className="card-icon-container">
                                <FaClipboardList className="card-icon" />
                            </div>
                            <Card.Title className="card-title">Solicitudes de Adopción</Card.Title>
                            <Card.Text className="card-text">
                                Revisa y gestiona todas las solicitudes de adopción. Aprueba solicitudes,
                                programa entrevistas y realiza seguimiento del proceso de adopción.
                            </Card.Text>
                            <Link to="">
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