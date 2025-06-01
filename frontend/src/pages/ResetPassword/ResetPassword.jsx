import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { infoToast, errorToast } from '../../utils/notifications.js';
import { resetPasswordRequest } from '../../services/api.services.js';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    // Obtiene el token de la query string
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password) {
            errorToast('La contraseña no puede estar vacía.');
            return;
        }
        resetPasswordRequest(
            token,
            password,
            () => infoToast('¡Contraseña cambiada con éxito!'),
            navigate("/"),

            (error) => errorToast(error.message || 'Error al cambiar la contraseña')
        );
    };

    return (
        <div className="container mt-5">
            <h2>Restablecer Contraseña</h2>
            <p>Ingresa tu nueva contraseña.</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNewPassword">
                    <Form.Label>Nueva Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Cambiar contraseña
                </Button>
            </Form>
        </div>
    );
};

export default ResetPassword;
