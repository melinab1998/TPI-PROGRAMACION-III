import React, { useState } from 'react';
import './Donation.css';
import { Container, Form, Button } from 'react-bootstrap';

function Donation() {

  const donationState = {
    name: "",
    amount: "",
    payment_method: "",
    message: "",
  };
  const [formData, setFormData] = useState(donationState)



  const handleData = (e) => {
    const { id, value } = e.target;
    // Actualiza el estado con el nuevo valor
    setFormData(prev => ({ ...prev, [id]: value }));
    console.log(formData);
    
  };
  return (
    <Container className="donacion-contenedor my-5">
      <h1 className="donacion-titulo">Doná a nuestra causa</h1>

      <p className="donacion-texto">
        Con tu ayuda, podemos seguir rescatando, alimentando y cuidando a más animales que lo necesitan.
        ¡Gracias por tu apoyo!
      </p>

      <Form className="donacion-formulario">
        <Form.Group className="mb-3">
          <Form.Label className="donacion-label">Nombre:</Form.Label>
          <Form.Control type="text" placeholder="Tu nombre" id="name" className="donacion-input" onChange={handleData} value={formData.name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="donacion-label">Monto a donar:</Form.Label>
          <Form.Control type="number" placeholder="$500" id="amount" className="donacion-input" onChange={handleData} value={formData.amount} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="donacion-label">Método de pago:</Form.Label>
          <Form.Select id="payment_method" className="donacion-input" onChange={handleData} value={formData.payment_method}>
            <option >Seleccionar...</option>
            <option >Tarjeta de crédito / débito</option>
            <option >Mercado Pago</option>
            <option >PayPal</option>
            <option >Transferencia bancaria</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="donacion-label">Mensaje (opcional):</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="¿Querés dejar un mensajito?" id="message" className="donacion-textarea"onChange={handleData} value={formData.message}/>
        </Form.Group>

        <Button type="submit" className="donacion-boton">Donar ahora</Button>
      </Form>
    </Container>
  );
}




export default Donation;