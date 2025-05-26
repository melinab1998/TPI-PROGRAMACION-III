import { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { errorToast } from '../../utils/notifications.js';
import './Donation.css';
import donationImg from "../../img/donation-alert.png";
import { FaPaw } from 'react-icons/fa';
import { validateDonationName, validateEmail, validateAmount, validatePaymentMethod } from '../../utils/validations.js';
import { createDonation } from '../../services/api.services.js';

function Donation() {
  const initialState = {
    name: "",
    email: "",
    amount: "",
    payment_method: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleData = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const validateField = (id, value) => {
    let error = "";
    switch (id) {
      case "name":
        error = validateDonationName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "amount":
        error = validateAmount(value);
        break;
      case "payment_method":
        error = validatePaymentMethod(value);
        break;
    }
    setErrors(prev => ({ ...prev, [id]: error }));
    return !error;
  };

  const validateForm = () => {
    return Object.keys(formData).every(key => {
      if (key === "message") return true;
      return validateField(key, formData[key]);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      errorToast("Por favor completá todos los campos correctamente.");
      return;
    }

    createDonation(
      formData,
      () => {
        Swal.fire({
          title: "¡Gracias por tu donación!",
          text: "Tu apoyo hace una gran diferencia 💖",
          imageUrl: donationImg,
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Imagen de agradecimiento",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#CD5C5C",
        });

        setFormData(initialState);
      },
      (err) => {
        errorToast("Ocurrió un error al procesar tu donación");
        console.error("Error:", err);
      }
    );
  };

  return (
    <Container className="my-5 donation-container">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="donation-card">
            <Card.Header className="donation-header text-center py-3">
              <h2 className="title-with-icon mb-0">
                <FaPaw className="paw-icon me-2" />
                Doná a nuestra causa
              </h2>
            </Card.Header>
            <Card.Body className="px-4 py-3">
              <p className="donation-text mb-4">
                Con tu ayuda, podemos seguir rescatando, alimentando y cuidando a más animales que lo necesitan.
              </p>

              <Form className="donation-form" onSubmit={handleSubmit}>
                <h5 className="section-title mb-3">Tus Datos</h5>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleData}
                    onBlur={(e) => validateField("name", e.target.value)}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleData}
                    onBlur={(e) => validateField("email", e.target.value)}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Monto a donar:</Form.Label>
                  <Form.Control
                    type="number"
                    id="amount"
                    value={formData.amount}
                    onChange={handleData}
                    onBlur={(e) => validateField("amount", e.target.value)}
                    isInvalid={!!errors.amount}
                  />
                  <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Método de pago:</Form.Label>
                  <Form.Select
                    id="payment_method"
                    value={formData.payment_method}
                    onChange={handleData}
                    onBlur={(e) => validateField("payment_method", e.target.value)}
                    isInvalid={!!errors.payment_method}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Tarjeta Débito/Crédito">Tarjeta Débito/Crédito</option>
                    <option value="Transferencias">Transferencias</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Mercado Pago">Mercado Pago</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.payment_method}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Mensaje (opcional):</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleData}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                  <Button type="submit" className="btn-lost-pet-primary py-2">Donar ahora</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Donation;