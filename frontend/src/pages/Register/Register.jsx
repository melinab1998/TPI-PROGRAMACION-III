import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "./Register.css";
import { errorToast, successToast } from '../../utils/notifications.js';
import "react-toastify/dist/ReactToastify.css";
import { validateUserName, validateEmail, validatePassword, validateConfirmPassword } from "../../utils/validations.js";
import { registerUser } from "../../services/api.services.js"

const Register = () => {
  const navigate = useNavigate();

  const initialFormState = {
    user_name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);

  const handleData = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const validateField = (id, value) => {
    let error = "";
    switch (id) {
      case "user_name":
        error = validateUserName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirm_password":
        error = validateConfirmPassword(value, formData.password);
        break;
    }
    setErrors(prev => ({ ...prev, [id]: error }));
    return !error;
  };

  const validateForm = () => {
    return Object.keys(formData).every(key => validateField(key, formData[key]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      errorToast("Por favor complete todos los campos correctamente");
      return;
    }

    registerUser(
      formData,
      () => {
        successToast("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setTimeout(() => {
          navigate("/", { state: { showLogin: true } });
        }, 2000);
      },
      ({ data, message }) => {
        if (data?.error === "email_exists") {
          setErrors(prev => ({ ...prev, email: data.message }));
        }
        errorToast(message || "Hubo un error al conectar con el servidor");
      }
    );

  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 image">
      <div className="card p-4 form" style={{ width: "500px", borderRadius: "10px" }}>
        <div className="cont-header-form">
          <h2 className="title font-semibold">Regístrate</h2>
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="user_name">Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                id="user_name"
                value={formData.user_name}
                onChange={handleData}
                onBlur={(e) => validateField("user_name", e.target.value)}
                isInvalid={!!errors.user_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.user_name}
              </Form.Control.Feedback>
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
                onBlur={(e) => validateField("email", e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
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
                onBlur={(e) => validateField("password", e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
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
              <Button type="submit" variant="primary" className="button-reg">
                Registrarse
              </Button>
            </Col>
          </Row>
        </Form>
        <p className="p mt-3">
          ¿Ya tienes cuenta? <a href="/" onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { showLogin: true } });
          }}>Inicia Sesión</a>
        </p>
        <div className="networks mt-3">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook size={40} /></a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer"><BsTwitterX size={40} color="black" /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram size={40} color="#E1306C" /></a>
        </div>
      </div>
    </div>
  );
};

export default Register;