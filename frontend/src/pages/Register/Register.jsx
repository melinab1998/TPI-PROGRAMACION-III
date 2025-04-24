import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import logo from "../../img/logo.png";
import "./Register.css";

const Register = () => {
  useEffect(() => {
    document.body.classList.add("custom-register");
    return () => {
      document.body.classList.remove("custom-register");
    };
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    birth_date: "",
    address: "",
    password: ""
  });
  const handleData = (e) => {
    setFormData({ 
      ...formData,
      [e.target.id]: e.target.value 
    });
    console.log(formData);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        alert("Usuario creado correctamente");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un error al conectar con el servidor");
    }
  };

  

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="imagen d-none d-lg-block me-4"></div>

      <div
        className="card p-4 form"
        style={{ width: "800px", borderRadius: "10px" }}
      >
        <div className="cont-header-form">
          <h2 className="mb-4 titulo font-semibold">Regístrate</h2>
          <img className="logo" src={logo} alt="Logo" />
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="nombre">Nombre</Form.Label>
              <Form.Control type="text" id="first_name"   value={formData.first_name} onChange={handleData} required/>
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="apellido">Apellido</Form.Label>
              <Form.Control type="text" id="last_name" required  value={formData.last_name} onChange={handleData}/>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" required value={formData.email} onChange={handleData} />
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="telefono">Teléfono</Form.Label>
              <Form.Control type="tel" id="mobile" required value={formData.mobile} onChange={handleData}/>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="birth_date">Fecha de nacimiento</Form.Label>
              <Form.Control type="date" id="birth_date" required value={formData.birth_date} onChange={handleData}/>
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="direccion">Dirección</Form.Label>
              <Form.Control type="text" id="address" value={formData.address} onChange={handleData}/>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="contrasena">Contraseña</Form.Label>
              <Form.Control type="password" id="password" required value={formData.password} onChange={handleData}/>
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="confirmarContrasena">
                Confirmar Contraseña
              </Form.Label>
              <Form.Control type="password" id="confirmarContrasena" required />
            </Col>
          </Row>

          <Row className="justify-content-center mt-3">
            <Col xs="auto">
              <Button type="submit" variant="primary" className="button">
                Registrarse
              </Button>
            </Col>
          </Row>
        </Form>

        <p className="p mt-3">
          ¿Ya tienes cuenta? <a href="/">Inicia Sesión</a>
        </p>

        <div className="social mt-3">
          <a href="">
            <FaFacebook size={40} />
          </a>
          <a href="">
            <BsTwitterX size={40} color="black" />
          </a>
          <a href="">
            <FaInstagram size={40} color="#E1306C" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
