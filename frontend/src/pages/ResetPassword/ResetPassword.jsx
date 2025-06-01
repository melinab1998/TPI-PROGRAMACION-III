import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { infoToast, errorToast } from '../../utils/notifications.js';
import { resetPasswordRequest } from '../../services/api.services.js';
import { validatePassword, validateConfirmPassword } from '../../utils/validations.js';

const ResetPassword = () => {
    const initialFormState = {
        password: '',
        confirm_password: ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState(initialFormState);
    const location = useLocation();
    const navigate = useNavigate();

    // Obtiene el token de la query string
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const handleData = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const validateField = (id, value) => {
        let error = '';
        switch (id) {
            case 'password':
                error = validatePassword(value);
                break;
            case 'confirm_password':
                error = validateConfirmPassword(value, formData.password);
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
        return !error;
    };

    const validateForm = () => {
        return Object.keys(formData).every(key => validateField(key, formData[key]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            errorToast('Por favor complete todos los campos correctamente');
            return;
        }
        resetPasswordRequest(
            token,
            formData.password,
            () => {
                infoToast('¡Contraseña cambiada con éxito!');
                navigate('/');
            },
            (error) => errorToast(error.message || 'Error al cambiar la contraseña')
        );
    };

    return (
        <div className="container mt-5">
            <h2>Restablecer Contraseña</h2>
            <p>Ingresa tu nueva contraseña.</p>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label htmlFor="password">Nueva Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleData}
                            onBlur={e => validateField('password', e.target.value)}
                            isInvalid={!!errors.password}
                            placeholder="Nueva contraseña"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label htmlFor="confirm_password">Confirmar Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            id="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleData}
                            onBlur={e => validateField('confirm_password', e.target.value)}
                            isInvalid={!!errors.confirm_password}
                            placeholder="Confirmar contraseña"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirm_password}
                        </Form.Control.Feedback>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Cambiar contraseña
                </Button>
            </Form>
        </div>
    );
};

export default ResetPassword;
