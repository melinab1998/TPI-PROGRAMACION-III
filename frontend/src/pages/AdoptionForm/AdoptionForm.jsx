import { Container, Row, Col, Form, Button, InputGroup, Card } from 'react-bootstrap';
import React from 'react'
import { useState } from 'react';
import './AdoptioForm.css'

const AdoptionForm = () => {
  const [hasPets, setHasPets] = useState('null');
  const [ownerConsultationStatus, setOwnerConsultationStatus] = useState('null')
  const [showTerms, setShowTerms] = useState(false);
  const handleStatus = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <Form className="adoption-form">
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

            onChange={handleStatus(setOwnerConsultationStatus)}
          />
          <Form.Check
            type="radio"
            label="INQUILINO"
            name="ownershipStatus"
            id="ownership-tenant"
            value='tenant'
            onChange={handleStatus(setOwnerConsultationStatus)}
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
            disabled={ownerConsultationStatus !== 'tenant'}
          />
          <Form.Check
            type="radio"
            label="No pregunté, pero el edificio admite"
            name="ownerConsultation"
            id="owner-building-allows"
            disabled={ownerConsultationStatus !== 'tenant'}
          />
          <Form.Check
            type="radio"
            label="No pregunté"
            name="ownerConsultation"
            id="owner-no"
            disabled={ownerConsultationStatus !== 'tenant'}
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
            onChange={handleStatus(setHasPets)}
          />
          <Form.Check
            type="radio"
            label="No"
            name="petStatus"
            id="pets-no"
            value="no"
            onChange={handleStatus(setHasPets)}
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
            name="hadOtherPets"
            id="had-other-pets-yes"
            value="yes"
          />
          <Form.Check
            type="radio"
            label="No"
            name="hadOtherPets"
            id="had-other-pets-no"
            value="no"
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formReason">
        <Form.Label>¿Por qué querés adoptar una mascota?</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formVacationPlan">
        <Form.Label>¿Qué harías con el animal en caso de vacaciones?</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formControlTextarea">
        <Form.Label>¿Qué harías con el animal en caso de mudanza?</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDailyWalks">
        <Form.Label>¿Contás con el tiempo para paseos diarios?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí"
            name="dailyWalks"
            id="daily-walks-yes"
            value="yes"
          />
          <Form.Check
            type="radio"
            label="No"
            name="dailyWalks"
            id="daily-walks-no"
            value="no"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFollowUp">
        <Form.Label>¿Estás de acuerdo con un seguimiento vía WhatsApp?</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="radio"
            label="Sí"
            name="whatsappFollowUp"
            id="whatsapp-follow-up-yes"
            value="yes"
          />
          <Form.Check
            type="radio"
            label="No"
            name="whatsappFollowUp"
            id="whatsapp-follow-up-no"
            value="no"
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          label={
            <>
              Acepto los <span onClick={handleTerms} className="text-[#f29a8e] opacity-80 underline cursor-pointer">términos y condiciones</span>.
            </>
          }
        />
      </Form.Group>
      {showTerms && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Términos y Condiciones</Card.Title>
            <Card.Text>
              Completar el “formulario de adopción” es el primer paso para avanzar con la posibilidad de adoptar. Es importante que sepas que la solicitud no garantiza la adopción inmediata, ya que el proceso depende de varios factores: la veracidad de los datos brindados, una entrevista previa y la disponibilidad del animal elegido.
              Para poder considerar tu postulación, necesitamos que completes todos los campos con información real y precisa de la persona interesada en adoptar. Si los datos no son completos o no se cumplen ciertos requisitos, es posible que no podamos continuar con la solicitud.
              Nos tomamos muy en serio cada caso, por eso puede llevarnos un tiempo responder. Agradecemos tu paciencia mientras revisamos cada formulario con el cuidado que se merece.
              IMPORTANTE: esta prohibido adoptar para terceros. Los adoptantes son responsables de la integridad fisica de la mascota.
            </Card.Text>
            <Button variant="secondary" onClick={handleTerms}>Cerrar</Button>
          </Card.Body>
        </Card>
      )}
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  )
}

export default AdoptionForm