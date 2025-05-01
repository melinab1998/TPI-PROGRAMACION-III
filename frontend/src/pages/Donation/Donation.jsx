import React, { useState } from 'react';
import './Donation.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';

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
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  const handleData = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const validateField = (id, value) => {
    let error = "";

    switch (id) {
      case "name":
        error = !value.trim() ? "El nombre es obligatorio." : "";
        break;
      case "email":
        if (!value.trim()) error = "El email es obligatorio.";
        else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(value)) error = "Formato de email inválido.";
        break;
      case "amount":
        error = !value || parseFloat(value) <= 0 ? "El monto debe ser mayor a 0." : "";
        break;
      case "payment_method":
        error = !value || value === "Seleccionar..." ? "Debe elegir un método de pago." : "";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: "", text: "" });

    if (!validateForm()) {
      setFormMessage({ type: "danger", text: "Por favor completá todos los campos obligatorios correctamente." });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al donar.");
      }

      const result = await response.json();
      console.log("Donación exitosa:", result);
      alert("¡Gracias por tu donación!");

      setFormData({
        name: "",
        email: "",
        amount: "",
        payment_method: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al procesar tu donación.");
    }
  };
  return (
    <Container className="donacion-contenedor my-5">
      <h1 className="donacion-titulo">Doná a nuestra causa</h1>
      <p className="donacion-texto">
        Con tu ayuda, podemos seguir rescatando, alimentando y cuidando a más animales que lo necesitan. ¡Gracias por tu apoyo!
      </p>

      {formMessage.text && (
        <Alert variant={formMessage.type} dismissible onClose={() => setFormMessage({ type: "", text: "" })}>
          {formMessage.text}
        </Alert>
      )}

      <Form className="donacion-formulario" onSubmit={handleSubmit}>
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

        <Form.Group className="mb-3">
          <Form.Label>Mensaje (opcional):</Form.Label>
          <Form.Control
            as="textarea"
            id="message"
            rows={3}
            value={formData.message}
            onChange={handleData}
          />
        </Form.Group>

        <Button type="submit" className="donacion-boton">Donar ahora</Button>
      </Form>
    </Container>
  );
}

export default Donation;
