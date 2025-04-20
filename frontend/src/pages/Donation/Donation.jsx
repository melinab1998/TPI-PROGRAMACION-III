import React from 'react';
import './Donation.css';

const Donation = () => {
  return (
    <div className="donacion-contenedor">
      <h1 className="donacion-titulo">Doná a nuestra causa</h1>

      <p className="donacion-texto">
        Con tu ayuda, podemos seguir rescatando, alimentando y cuidando a más animales que lo necesitan.
        ¡Gracias por tu apoyo!
      </p>

      <form className="donacion-formulario">
        <label className="donacion-label">
          Nombre:
          <input type="text" name="nombre" placeholder="Tu nombre" className="donacion-input" />
        </label>

        <label className="donacion-label">
          Email:
          <input type="email" name="email" placeholder="tu@email.com" className="donacion-input" />
        </label>

        <label className="donacion-label">
          Monto a donar:
          <input type="number" name="monto" placeholder="$500" className="donacion-input" />
        </label>

        <label className="donacion-label">
          Método de pago:
          <select name="metodoPago" className="donacion-input">
            <option value="">Seleccionar...</option>
            <option value="tarjeta">Tarjeta de crédito / débito</option>
            <option value="mercadopago">Mercado Pago</option>
            <option value="paypal">PayPal</option>
            <option value="transferencia">Transferencia bancaria</option>
          </select>
        </label>

        <label className="donacion-label">
          Mensaje (opcional):
          <textarea name="mensaje" placeholder="¿Querés dejar un mensajito?" className="donacion-textarea" />
        </label>

        <button type="submit" className="donacion-boton">Donar ahora</button>
      </form>
    </div>
  );
};

export default Donation;