import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap'; // Importando los componentes de react-bootstrap
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import logo from '../../img/logo.png';
import './Register.css';

const Register = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className='imagen d-none d-lg-block me-4'>
      </div>
      <div className="card p-4 form"  style={{ width: '800px', borderRadius: '10px' }}>
        <div className='cont-header-form'>
        <h2 className="mb-4 titulo font-semibold ">Regístrate</h2>
        <img className='logo' src={logo} alt="Logo" />
        </div>
       
        <Form>
          <Row className="mb-3 ">
            <Col md={6}>
              <Form.Label htmlFor="nombre">Nombre</Form.Label>
              <Form.Control type="text" id="nombre" required />
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="apellido" cl>Apellido</Form.Label>
              <Form.Control type="text" id="apellido" required />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" required />
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="telefono">Teléfono</Form.Label>
              <Form.Control type="tel" id="telefono" required />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="contrasena">Contraseña</Form.Label>
              <Form.Control type="password" id="contrasena" required />
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="confirmarContrasena">Confirmar Contraseña</Form.Label>
              <Form.Control type="password" id="confirmarContrasena" required />
            </Col>
          </Row>

          <Row className="mb-3 d-flex align-items-center">
            <Col md={6}>
              <Form.Label htmlFor="direccion">Dirección</Form.Label>
              <Form.Control type="text" id="direccion" />
            </Col>
            <Col md={2} className="d-flex justify-content-start mt-4 lg:justify-content-center">
              <Button type="submit" variant="primary" className=" lg:w-60 button">Registrarse</Button>
            </Col>
          </Row>
        </Form>
        <p className='p'>Ya tienes cuenta? <a href="/">Inicia Sesion</a></p>
        <div className='social'>
        <a href="">
          <FaFacebook size={40} />
        </a>
        <a href="">
          <BsTwitterX size={40} color='black' />
        </a>
        <a href="">
          <FaInstagram size={40} color='#E1306C' />
        </a>
        </div>
      </div>
    </div>
  );
};

export default Register;