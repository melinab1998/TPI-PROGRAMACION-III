import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
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
    user_name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState(initialFormState);
  // Estado para mensajes generales (éxito/error)
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  // Maneja cambios en los campos del formulario
  const handleData = (e) => {
    const { id, value } = e.target;
    // Actualiza el estado con el nuevo valor
    setFormData(prev => ({ ...prev, [id]: value }));
    
  };

  // Valida el formulario completo (solo los campos esenciales)
  const validateForm = () => {
    return formData.password === formData.confirm_password;
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Limpia mensajes anteriores
    setFormMessage({ type: "", text: "" });

    // Valida el formulario completo
    if (!validateForm()) {
      setFormMessage({ type: "danger", text: "Las contraseñas no coinciden" });
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
        setFormMessage({ type: "danger", text: responseData.message || "Error al crear el usuario" });
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setFormMessage({ type: "danger", text: "Hubo un error al conectar con el servidor" });
    }
  };

  // Renderizado del componente
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 imagen">
      <div className="card p-4 form" style={{ width: "500px", borderRadius: "10px" }}>
        <div className="cont-header-form">
        <h2 className="titulo font-semibold">Regístrate</h2>
          <img className="logo" src={logo} alt="Logo" />
        </div>
        {formMessage.text && (
          <div className={`alert alert-${formMessage.type}`} role="alert">
            {formMessage.text}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="user_name">Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                id="user_name"
                value={formData.user_name}
                onChange={handleData}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={formData.email}
                onChange={handleData}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={formData.password}
                onChange={handleData}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="confirm_password">Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleData}
              />
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
