import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import React from 'react'
import { useState } from 'react';

const AdoptionForm = () => {
  const [hasPets, setHasPets] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const handlePetStatus = (e) => {
    setHasPets(e.target.value);
    console.log(hasPets);

  }
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastname">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" placeholder="Apellido" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Dirección</Form.Label>
        <Form.Control placeholder="San Lorenzo 2500" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Dirección 2(Opcional)</Form.Label>
        <Form.Control placeholder="Apartamento" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Localidad</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Provincia</Form.Label>
          <Form.Control />
        </Form.Group>



        <Form.Group as={Col} controlId='formGridDni'>
          <Form.Label>DNI</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>




      <Form.Group>
        <Form.Label>¿En qué tipo de vivienda habitás?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="CASA"
            name="housingType"
            id="housing-house"
          />
          <Form.Check
            type="radio"
            label="DEPARTAMENTO"
            name="housingType"
            id="housing-apartment"
          />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Seleccioná la opción correcta:</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="PROPIETARIO"
            name="ownershipStatus"
            id="ownership-owner"
          />
          <Form.Check
            type="radio"
            label="INQUILINO"
            name="ownershipStatus"
            id="ownership-tenant"
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>En caso de alquilar, ¿lo consultaste con el dueño?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí, pregunté y admite mascotas"
            name="ownerConsultation"
            id="owner-yes"
          />
          <Form.Check
            type="radio"
            label="No pregunté, pero el edificio admite"
            name="ownerConsultation"
            id="owner-building-allows"
          />
          <Form.Check
            type="radio"
            label="No pregunté"
            name="ownerConsultation"
            id="owner-no"
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>¿Cuenta con patio la vivienda?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí"
            name="courtyardStatus"
            id="courtyard-ownership"
          />
          <Form.Check
            type="radio"
            label="No"
            name="courtyardStatus"
            id="courtyard-ownership"
          />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>¿Tenés otros animales?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí"
            name="petStatus"
            id="pets-yes"
            value="yes"
            onChange={handlePetStatus}
          />
          <Form.Check
            type="radio"
            label="No"
            name="petStatus"
            id="pets-no"
            value="no"
            onChange={handlePetStatus}
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>En caso afirmativo, ¿están castrados?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí"
            name="petsNeutered"
            id="pets-neutered-yes"
            disabled={hasPets !== 'yes'}
          />
          <Form.Check
            type="radio"
            label="No"
            name="petsNeutered"
            id="pets-neutered-no"
            disabled={hasPets !== 'yes'}
          />
          <Form.Check
            type="radio"
            label="Algunos sí, otros no"
            name="petsNeutered"
            id="pets-neutered-some"
            disabled={hasPets !== 'yes'}
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>¿Tuviste otras mascotas?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí"
            name="petsNeutered"
            id="pets-neutered-yes"
            disabled={hasPets !== 'yes'}
          />
          <Form.Check
            type="radio"
            label="No"
            name="petsNeutered"
            id="pets-neutered-no"
            disabled={hasPets !== 'yes'}
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>¿Qué harías con el animal en caso de vacaciones?</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>¿Qué harías con el animal en caso de mudanza?</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>¿Contas con el tiempo para paseos diarios?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí"
            name="petsNeutered"
            id="pets-neutered-yes"
          />
          <Form.Check
            type="radio"
            label="No"
            name="petsNeutered"
            id="pets-neutered-no"
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>¿Estas de acuerdo con un seguimiento vía whatsapp?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí"
            name="petsNeutered"
            id="pets-neutered-yes"
          />
          <Form.Check
            type="radio"
            label="No"
            name="petsNeutered"
            id="pets-neutered-no"
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Acepto los terminos y condiciones." />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  )
}

export default AdoptionForm