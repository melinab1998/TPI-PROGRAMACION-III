import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contact.css';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { createContact } from '../../services/api.services';
import { errorToast, successToast } from '../../utils/notifications.js';
import { validateUserName, validateEmail, validateMessage } from "../../utils/validations.js";

const Contact = () => {

  const initialFormState = {
    name: "",
    email: "",
    message: ""
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
      case "name":
        error = validateUserName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "message":
        error = validateMessage(value);
        break;
      default:
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

    createContact(
      formData,
      () => {
        successToast("Mensaje enviado con éxito.");
        setFormData(initialFormState);
        setErrors(initialFormState);
      },
      (error) => {
        errorToast("Hubo un error al enviar el mensaje. Intenta nuevamente más tarde.");
      }
    );
  };

  return (
    <section className="contact-section">
      <Container>
        <Row>
          <Col md={6} className="contact-information">
            <h2 className="contact-title">Contáctanos</h2>
            <h4 className="contact-subtitle">¿Cómo podemos ayudarte?</h4>
            <p className="contact-networks">
              Si tenés alguna consulta, querés colaborar o simplemente hablarnos, estamos para escucharte. 
              Completá el formulario o escribinos por nuestras redes sociales:
            </p>
            <div className="contact-networks">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </Col>

          <Col md={6}>
            <Form className="contact-form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                  id="name"
                  type="text" 
                  placeholder="Tu nombre" 
                  value={formData.name}
                  onChange={handleData}
                  onBlur={(e) => validateField("name", e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control 
                  id="email"
                  type="email" 
                  placeholder="nombre@email.com"
                  value={formData.email}
                  onChange={handleData}
                  onBlur={(e) => validateField("email", e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control 
                  id="message"
                  as="textarea" 
                  rows={4} 
                  placeholder="Escribí tu mensaje..."
                  value={formData.message}
                  onChange={handleData}
                  onBlur={(e) => validateField("message", e.target.value)}
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="contact-button" type="submit">
                Contactar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
