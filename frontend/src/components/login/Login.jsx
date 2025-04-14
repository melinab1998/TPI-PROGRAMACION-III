import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../login/login.css'
import logo from '../../img/logo.png';
const Login = () => {
    return (
        <Form>
            <img
                src={logo}
                alt="Logo"
                className="custom-logo"
            />
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control type="email" placeholder="Email" />
                <Form.Text className="text-muted">
                    ¿No tienes cuenta? <a href="/">Registrate aqui</a>
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Form.Text className="text-muted">
                    <a href="/">¿Olvidaste tu contraseña?</a>
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recuerdame" />
            </Form.Group>
            <Button className='btn' variant="primary" type="submit">
                Iniciar Sesión
            </Button>
        </Form>
    )
}

export default Login