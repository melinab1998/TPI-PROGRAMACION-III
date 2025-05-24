import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { validateName, validateAddress, validatePhone, validateEmail } from "../../../utils/validations.js"
import "../../AdminComponents/PetForm/PetForm.css";

const ShelterForm = ({ show, onHide, onSubmit, formData, handleChange, isEdit, error }) => {
    const [errors, setErrors] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    const handleData = (e) => {
        const { name, value } = e.target;
        handleChange(e); 
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "name":
                error = validateName(value);
                break;
            case "address":
                error = validateAddress(value);
                break;
            case "phone":
                error = validatePhone(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const validateForm = () => {
        const isValidName = validateField("name", formData.name);
        const isValidAddress = validateField("address", formData.address);
        const isValidPhone = validateField("phone", formData.phone);
        const isValidEmail = validateField("email", formData.email);
        
        return isValidName && isValidAddress && isValidPhone && isValidEmail;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        onSubmit(e);
    };

    return (
        <Modal show={show} onHide={onHide} centered className="pet-form-modal">
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Editar Refugio' : 'Agregar Refugio'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del refugio</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleData}
                            onBlur={(e) => validateField("name", e.target.value)}
                            isInvalid={!!errors.name}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleData}
                            onBlur={(e) => validateField("address", e.target.value)}
                            isInvalid={!!errors.address}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleData}
                            onBlur={(e) => validateField("phone", e.target.value)}
                            isInvalid={!!errors.phone}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleData}
                            onBlur={(e) => validateField("email", e.target.value)}
                            isInvalid={!!errors.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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