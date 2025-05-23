import { Modal, Button, Row, Col } from 'react-bootstrap';
import './DetailModal.css';

const DetailModal = ({ show, onHide, request }) => {
    return (
        <Modal show={show} onHide={onHide} centered className="detail-modal">
            <Modal.Header closeButton>
                <Modal.Title>Detalle de solicitud #{request.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <ul className="list-unstyled">
                            <li><strong>Usuario:</strong> {request.name} {request.last_name}</li>
                            <li><strong>Mascota:</strong> {request.Pet?.name}</li>
                            <li><strong>Teléfono:</strong> {request.phone}</li>
                            <li><strong>Ciudad:</strong> {request.city}</li>
                            <li><strong>Tipo de vivienda:</strong> {request.housing_type}</li>
                            <li><strong>Consulta propietario:</strong> {request.owner_consultation ? "Sí" : "No"}</li>
                            <li><strong>Tiene otras mascotas:</strong> {request.has_pets ? "Sí" : "No"}</li>
                            <li><strong>Paseos diarios:</strong> {request.daily_walks ? "Sí" : "No"}</li>
                            <li><strong>Motivo de adopción:</strong> {request.reason}</li>
                            <li><strong>Mudanza:</strong> {request.moving_plan}</li>
                            <li><strong>Seguimiento por WhatsApp:</strong> {request.whatsapp_follow_up ? "Sí" : "No"}</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <ul className="list-unstyled">
                            <li><strong>Email:</strong> {request.User?.email}</li>
                            <li><strong>Dirección:</strong> {request.address}</li>
                            <li><strong>DNI:</strong> {request.dni}</li>
                            <li><strong>Provincia:</strong> {request.province}</li>
                            <li><strong>Condición de vivienda:</strong> {request.ownership_status}</li>
                            <li><strong>Patio:</strong> {request.has_courtyard ? "Sí" : "No"}</li>
                            <li><strong>Otras mascotas castradas:</strong> {request.pets_neutered ? "Sí" : "No"}</li>
                            <li><strong>Tuvo otras mascotas:</strong> {request.had_other_pets ? "Sí" : "No"}</li>
                            <li><strong>Vacaciones:</strong> {request.vacation_plan}</li>
                            <li><strong>Estado:</strong> {request.state || "Pendiente"}</li>
                            <li><strong>Fecha de solicitud:</strong> {new Date(request.createdAt).toLocaleDateString()}</li>
                        </ul>
                    </Col> 
                </Row>   
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailModal;