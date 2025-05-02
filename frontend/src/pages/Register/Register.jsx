import React, { useState } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "./Register.css";

const Register = () => {
  // Hook para navegación entre rutas
  const navigate = useNavigate();
  
  // Estado inicial para los datos del formulario
  const initialFormState = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState(initialFormState);
  // Estado para almacenar mensajes de error de validación
  const [errors, setErrors] = useState(initialFormState);
  // Estado para mensajes generales (éxito/error)
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  
  //Maneja cambios en los campos del formulario

  const handleData = (e) => {
    const { id, value } = e.target;
    // Actualiza el estado con el nuevo valor
    setFormData(prev => ({ ...prev, [id]: value }));
    // Limpia el error si existe
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  //Valida un campo específico del formulario

  const validateField = (id, value) => {
    let error = "";

    switch(id) {
      case "username":
        error = !value.trim() ? "Este campo es obligatorio" : "";
        break;
      case "email":
        if (!value) error = "Email es obligatorio.";
        else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) 
          error = "El formato del email es incorrecto.";
        break;
      case "password":
        if (!value) error = "Contraseña es obligatoria.";
        else if (value.length < 6) error = "La contraseña debe tener al menos 6 caracteres.";
        break;
      case "confirm_password":
        if (!value) error = "Debe confirmar la contraseña.";
        else if (value !== formData.password) error = "Las contraseñas no coinciden.";
        break;
    }

    // Actualiza los errores
    setErrors(prev => ({ ...prev, [id]: error }));
    // Retorna si el campo es válido
    return !error;
  };

  
  //Valida todo el formulario
  const validateForm = () => {
    // Verifica que todos los campos pasen la validación
    return Object.keys(formData).every(key => validateField(key, formData[key]));
  };

  //Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Limpia mensajes anteriores
    setFormMessage({ type: "", text: "" });

    // Valida el formulario completo
    if (!validateForm()) {
      setFormMessage({ type: "danger", text: "Por favor complete todos los campos correctamente" });
      return;
    }

    try {
      // Envía los datos al servidor
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      // Si la respuesta es exitosa
      if (response.ok) {
        setFormMessage({ type: "success", text: "¡Registro exitoso! Redirigiendo..." });
        // Redirige después de 2 segundos
        setTimeout(() => navigate("/"), 2000);
      } else {
        // Manejo de errores específicos
        const errorType = responseData.error;
        const message = responseData.message || "Error al crear el usuario";
        
        setFormMessage({ type: "danger", text: message });
        // Marca campos específicos si hay errores de duplicados
        if (errorType === "email_exists") setErrors(prev => ({ ...prev, email: message }));
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setFormMessage({ type: "danger", text: "Hubo un error al conectar con el servidor" });
    }
  };

  // Renderizado del componente
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="imagen d-none d-lg-block me-4"></div>
      <div className="card p-4 form" style={{ width: "800px", borderRadius: "10px" }}>
        <div className="cont-header-form">
          <h2 className="mb-4 titulo font-semibold">Regístrate</h2>
          <img className="logo" src={logo} alt="Logo" />
        </div>
        {formMessage.text && (
          <Alert variant={formMessage.type} dismissible onClose={() => setFormMessage({ type: "", text: "" })}>
            {formMessage.text}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="username">Usuario</Form.Label>
              <Form.Control
                type="text"
                id="username"
                value={formData.first_name}
                onChange={handleData}
                onBlur={(e) => validateField("username", e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={formData.email}
                onChange={handleData}
                onBlur={(e) => validateField("email", e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
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
                onBlur={(e) => validateField("password", e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="confirm_password">Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleData}
                onBlur={(e) => validateField("confirm_password", e.target.value)}
                isInvalid={!!errors.confirm_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirm_password}
              </Form.Control.Feedback>
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