import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import logo from '../../img/logo.png';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import './Login.css';
import { infoToast, errorToast } from '../../utils/notifications.js';
import { loginUser } from '../../services/api.services.js';
import { AuthenticationContext } from '../../services/auth/AuthContext.jsx'

const Login = ({ showLogin, toggleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleUserLogin } = useContext(AuthenticationContext);

    const handleLogin = (e) => {
        e.preventDefault();

        loginUser(
            { email, password },
            (data) => {
                handleUserLogin(data.token); 
                console.log(data.token);
                setEmail('');
                setPassword('');
                toggleLogin();
                infoToast(`¡Bienvenido a Mi Hogar, ${data.user_name || 'usuario'}!`);
            },
            (error) => {
                errorToast(error.message || "Error al iniciar sesión");
                console.error(error);
            }
        );
    };

    return (
        <Modal show={showLogin} onHide={toggleLogin} centered className='modal-form' animation={false}>
            <Modal.Body className="modal-login">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Form onSubmit={handleLogin} className='login-form'>
                        <img
                            src={logo}
                            alt="Logo"
                            className="custom-logo block mx-auto w-[100px]"
                        />
                        <Modal.Title className='modal-title'>Iniciar Sesión</Modal.Title>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='modal-title'>E-mail</Form.Label>
                            <Form.Control type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                ¿No tienes cuenta?<Link to="/register" onClick={toggleLogin}> Registrate aquí</Link>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='modal-title'>Contraseña</Form.Label>
                            <Form.Control type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <Form.Text className="text-muted">
                                <a href="/">¿Olvidaste tu contraseña?</a>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Recuérdame" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="login-btn">
                            Iniciar Sesión
                        </Button>

                        <div className="separator my-4 text-center text-muted">
                            <span>O Inicia Sesión con</span>
                        </div>

                        <Button variant="light" className="w-100 d-flex align-items-center justify-content-center gap-2 mb-2 border">
                            <FcGoogle size={25} />
                            Continuar con Google
                        </Button>

                        <Button variant="light" className="w-100 d-flex align-items-center justify-content-center gap-2 border mt-10">
                            <FaFacebook size={25} className="text-primary" />
                            Continuar con Facebook
                        </Button>
                    </Form>
                </motion.div>
            </Modal.Body>
        </Modal>
    );
};

export default Login;