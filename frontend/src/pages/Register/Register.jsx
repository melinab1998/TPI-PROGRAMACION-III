import React, { useEffect, useState, useRef } from "react";
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
    password: "",
    confirm_password: ""
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    birth_date: "",
    address: "",
    password: "",
    confirm_password: ""
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleData = (e) => {
    setFormData({ 
      ...formData,
      [e.target.id]: e.target.value 
    });
  };

  const validateField = (id, value) => {
    let error = "";
    
    if (id === "email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!value) {
        error = "Email es obligatorio.";
      } else if (!emailRegex.test(value)) {
        error = "El formato del email es incorrecto.";
      }
    } else if (id === "mobile") {
      const phoneRegex = /^\+?(\d{1,4})?(\d{10})$/; // Formato telefónico argentino
      if (!value) {
        error = "Teléfono es obligatorio.";
      } else if (!phoneRegex.test(value)) {
        error = "El teléfono no es válido.";
      }
    } else if (id === "password") {
      if (!value) {
        error = "Contraseña es obligatoria.";
      } else if (value.length < 6) {
        error = "La contraseña debe tener al menos 6 caracteres.";
      }
    } else if (id === "confirm_password") {
      if (value !== formData.password) {
        error = "Las contraseñas no coinciden.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    // Si algún campo tiene error, no enviar el formulario
    if (Object.values(errors).some((err) => err)) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

      <div className="card p-4 form" style={{ width: "800px", borderRadius: "10px" }}>
        <div className="cont-header-form">
          <h2 className="mb-4 titulo font-semibold">Regístrate</h2>
          <img className="logo" src={logo} alt="Logo" />
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="first_name">Nombre</Form.Label>
              <Form.Control
                type="text"
                id="first_name"
                value={formData.first_name}
                onChange={handleData}
                onBlur={(e) => validateField(e.target.id, e.target.value)}
                isInvalid={errors.first_name}
              />
              {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="last_name">Apellido</Form.Label>
              <Form.Control
                type="text"
                id="last_name"
                value={formData.last_name}
                onChange={handleData}
                onBlur={(e) => validateField(e.target.id, e.target.value)}
                isInvalid={errors.last_name}
              />
              {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={formData.email}
                onChange={handleData}
                onBlur={(e) => validateField(e.target.id, e.target.value)}
                isInvalid={errors.email}
                ref={emailRef}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="mobile">Teléfono</Form.Label>
              <Form.Control
                type="tel"
                id="mobile"
                value={formData.mobile}
                onChange={handleData}
                onBlur={(e) => validateField(e.target.id, e.target.value)}
                isInvalid={errors.mobile}
              />
              {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="birth_date">Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                id="birth_date"
                value={formData.birth_date}
                onChange={handleData}
                onBlur={(e) => validateField(e.target.id, e.target.value)}
                isInvalid={errors.birth_date}
              />
              {errors.birth_date && <div className="text-danger">{errors.birth_date}</div>}
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="address">Dirección</Form.Label>
              <Form.Control
                type="text"
                id="address"
                value={formData.address}
                onChange={handleData}
                onBlur={(e) => validateField(e.target.id, e.target.value)}
                isInvalid={errors.address}
              />
              {errors.address && <div className="text-danger">{errors.address}</div>}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={formData.password}
                onChange={handleData}
                onBlur={(e) => validateField(e.target.id, e.target.value)}
                isInvalid={errors.password}
                ref={passwordRef}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="confirm_password">Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleData}
                onBlur={(e) => validateField(e.target.id, e.target.value)}
                isInvalid={errors.confirm_password}
                ref={confirmPasswordRef}
              />
              {errors.confirm_password && <div className="text-danger">{errors.confirm_password}</div>}
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