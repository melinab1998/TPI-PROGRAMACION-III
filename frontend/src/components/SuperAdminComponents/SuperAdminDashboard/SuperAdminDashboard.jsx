import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPaw, FaClipboardList, FaUsers, FaHome } from "react-icons/fa";
import StatsDashboard from "../../StatsDashboard/StatsDashboard";
import "../../AdminComponents/AdminDashboard/AdminDashboard.css"

const SuperAdminDashboard = () => {

    return (
        <Container className="admin-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Panel de Super Administración</h1>
                <p className="dashboard-subtitle">Gestión completa de la plataforma de adopción</p>
            </div>
            <StatsDashboard />
            <Row className="management-cards g-3">
                    <Col md={6}>
                    <Card className="management-card">
                        <Card.Body>
                            <div className="card-icon-container pets-card">
                                <FaUsers className="card-icon" />
                            </div>
                            <Card.Title className="card-title-dash">Gestión de Usuarios</Card.Title>
                            <Card.Text className="card-text-dash">
                                Administra todos los usuarios del sistema. Crea nuevos usuarios, asigna roles,
                                modifica permisos y gestiona el acceso a la plataforma.
                            </Card.Text>
                            <Link to="/usersmanagement">
                                <Button className="primary-btn">Administrar Usuarios</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
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
                    <Card className="management-card">
                        <Card.Body>
                            <div className="card-icon-container pets-card">
                                <FaHome className="card-icon" />
                            </div>
                            <Card.Title className="card-title-dash">Gestión de Refugios</Card.Title>
                            <Card.Text className="card-text-dash">
                                Gestiona los refugios asociados a la plataforma. Aprueba nuevos refugios,
                                edita información y asigna administradores para cada organización.
                            </Card.Text>
                            <Link to="/sheltersmanagement">
                                <Button className="primary-btn">Administrar Refugios</Button>
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

export default SuperAdminDashboard;