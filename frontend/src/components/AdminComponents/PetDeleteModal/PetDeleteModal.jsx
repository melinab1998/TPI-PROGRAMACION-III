import { Modal, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import "./PetDeleteModal.css"; 

const PetDeleteModal = ({ show, onHide, onConfirm, itemName, itemType }) => {
    return (
        <Modal show={show} onHide={onHide} centered className="pet-delete-modal">
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro que deseas eliminar {itemType} <strong>{itemName}</strong>? Esta acción no se puede deshacer.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm} className="d-flex align-items-center">
                    <FaTrash className="me-2" />
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PetDeleteModal;