import { Modal, Button, Form } from 'react-bootstrap';
import "./UpdateModal.css";

const UpdateModal = ({ show, onHide, currentState, onChangeState, onSave }) => {
    return (
        <Modal show={show} onHide={onHide} centered className="request-update-modal">
            <Modal.Header closeButton>
                <Modal.Title>Actualizar Estado de Solicitud</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Nuevo estado</Form.Label>
                    <Form.Select
                        value={currentState}
                        onChange={e => onChangeState(e.target.value)}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En revisión">En revisión</option>
                        <option value="Aprobada">Aprobada</option>
                        <option value="Rechazada">Rechazada</option>
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateModal;