import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../../img/logo.png';
import { Form, Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Login.css';
import { infoToast, errorToast } from '../../utils/notifications.js';
import { loginUser } from '../../services/api.services.js';
import { AuthenticationContext } from '../../services/auth/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";

const Login = ({ showLogin, toggleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { handleUserLogin } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (showLogin) {
            const savedEmail = localStorage.getItem('login_email');
            const savedPassword = localStorage.getItem('login_password');
            if (savedEmail && savedPassword) {
                setEmail(savedEmail);
                setPassword(savedPassword);
                setRememberMe(true);
            } else {
                setEmail('');
                setPassword('');
                setRememberMe(false);
            }
        }
    }, [showLogin]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('login_email', email);
            localStorage.setItem('login_password', password);
        } else {
            localStorage.removeItem('login_email');
            localStorage.removeItem('login_password');
        }


        loginUser(
            { email, password },
            (data) => {
                handleUserLogin(data.token);
                setEmail('');
                setPassword('');
                toggleLogin();
                infoToast(`¡Bienvenido a Mi Hogar, ${data.user_name || 'usuario'}!`);
                const redirectPath = localStorage.getItem("redirectAfterLogin");
                if (redirectPath) {
                    navigate(redirectPath);
                    localStorage.removeItem("redirectAfterLogin");
                }
                const decoded = jwtDecode(data.token);
                const role = decoded.role;
                if (role === "superadmin" || role === "admin") {
                    navigate("/")
                }
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
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-2" />
                            <Form.Text className="text-muted">
                                ¿No tienes cuenta?<Link to="/register" onClick={toggleLogin} className="login-link"> Registrate aquí</Link>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='modal-title'>Contraseña</Form.Label>
                            <Form.Control type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-2" />
                            <Form.Text className="text-muted">
                                <Link to="/forgot-password" onClick={toggleLogin} className="login-link">¿Olvidaste tu contraseña?</Link>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Recuérdame" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="login-btn">
                            Iniciar Sesión
                        </Button>

                        <div className="networks mt-4">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook size={40} /></a>
                            <a href="https://x.com/" target="_blank" rel="noopener noreferrer"><BsTwitterX size={40} color="black" /></a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram size={40} color="#E1306C" /></a>
                        </div>
                    </Form>
                </motion.div>
            </Modal.Body>
        </Modal>
    );
};

export default Login;