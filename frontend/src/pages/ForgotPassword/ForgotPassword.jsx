import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { forgotPasswordRequest } from '../../services/api.services.js'
import { infoToast, errorToast } from '../../utils/notifications.js'


const ForgotPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.formBasicEmail.value;

        forgotPasswordRequest(
            email, // <-- Solo el string, no un objeto
            () => {
                infoToast('Instrucciones para restablecer la contraseña enviadas a tu correo electrónico.');
            },
            (error) => {
                errorToast(`Error al enviar las instrucciones: ${error.message}`);
            }
        );
    };

    return (
        <div className="container mt-[5rem] h-[70vh]">
            <h2 className='mb-3 !text-[#5D4037]'>Recuperar Contraseña</h2>
            <p className='!text-[#5D4037]'>Por favor, ingresa tu correo electrónico para recibir instrucciones sobre cómo restablecer tu contraseña.</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Ingresa tu correo electrónico" className='md:!w-105 !mr-10'/>
                </Form.Group>
                <Button variant="primary" type="submit" className='mb-3 mt-3 contact-button'>
                    Enviar
                </Button>
            </Form>
        </div>
    );
};

export default ForgotPassword;