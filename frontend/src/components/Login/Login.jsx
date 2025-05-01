import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import logo from '../../img/logo.png';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
/* import './Login.css'; */

const Login = ({ showLogin, toggleLogin }) => {
    return (
        <Modal show={showLogin} onHide={toggleLogin} centered>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mb-3">
                    <img src={logo} alt="Logo" className="custom-logo" />
                </div>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@gmail.com" />
                        <Form.Text className="text-muted">
                            ¿No tienes cuenta? <a href="/">Registrate aquí</a>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="********" />
                        <Form.Text className="text-muted">
                            <a href="/">¿Olvidaste tu contraseña?</a>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Recuérdame" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Iniciar Sesión
                    </Button>

                    <div className="separator my-4 text-center text-muted">
                        <span>O Inicia Sesión con</span>
                    </div>

                    <Button variant="light" className="w-100 d-flex align-items-center justify-content-center gap-2 mb-2 border">
                        <FcGoogle size={20} />
                        Continuar con Google
                    </Button>

                    <Button variant="light" className="w-100 d-flex align-items-center justify-content-center gap-2 border">
                        <FaFacebook size={20} className="text-primary" />
                        Continuar con Facebook
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Login;
