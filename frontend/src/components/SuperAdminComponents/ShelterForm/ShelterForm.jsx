// ShelterForm.jsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import "../../AdminComponents/PetForm/PetForm.css"

const ShelterForm = ({ show, onHide, onSubmit, formData, handleChange, isEdit, error }) => {
    return (
        <Modal show={show} onHide={onHide} centered className="pet-form-modal">
    <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Editar Refugio' : 'Agregar Refugio'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre del refugio</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    {isEdit ? 'Guardar cambios' : 'Agregar refugio'}
                </Button>
            </div>
        </Form>
    </Modal.Body>
</Modal>
    );
};

export default ShelterForm;