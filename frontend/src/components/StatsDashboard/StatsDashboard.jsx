import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaPaw, FaClipboardList, FaHeart } from "react-icons/fa";
import { getStats } from "../../services/api.services.js";
import { errorToast } from "../../utils/notifications.js";

const StatsDashboard = () => {
  const [stats, setStats] = useState([
    { value: 0, label: "Mascotas en adopción", icon: <FaPaw /> },
    { value: 0, label: "Solicitudes pendientes", icon: <FaClipboardList /> },
    { value: 0, label: "Adopciones exitosas", icon: <FaHeart /> }
  ]);

  useEffect(() => {
    getStats(
      (data) => {
        const formattedStats = [
          { value: data.petsInAdoption, label: "Mascotas en adopción", icon: <FaPaw /> },
          { value: data.pendingRequests, label: "Solicitudes pendientes", icon: <FaClipboardList /> },
          { value: data.successfulAdoptions, label: "Adopciones exitosas", icon: <FaHeart /> }
        ];
        setStats(formattedStats);
      },
      () => errorToast("Error al obtener las estadísticas")
    );
  }, []);

  return (
    <Row className="stats-row">
      {stats.map((stat, index) => (
        <Col md={4} key={index}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatsDashboard;
