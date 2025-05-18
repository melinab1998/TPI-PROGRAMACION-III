import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './AdoptionForm.css';
import { errorToast, successToast } from '../../utils/notifications.js';
import {
  validateName, validateLastName, validateAddress, validatePhone, validateCity, validateProvince, validateDNI, validateHousingType,
  validateOwnershipStatus,
  validateOwnerConsultation,
  validateCourtyard,
  validateHasPets,
  validatePetsNeutered,
  validateHadOtherPets,
  validateReason,
  validateVacationPlan,
  validateMovingPlan,
  validateDailyWalks,
  validateWhatsappFollowUp,
  validateTerms
} from '../../utils/validations';
import { getPetById } from '../../services/api.services.js';
import { useParams } from 'react-router-dom';


const AdoptionForm = () => {

  const initialFormState = {
    name: "",
    lastname: "",
    address: "",
    phone: "",
    city: "",
    province: "",
    dni: "",
    housingType: null,
    ownershipStatus: null,
    ownerConsultation: null,
    hasCourtyard: null,
    hasPets: null,
    petsNeutered: null,
    hadOtherPets: null,
    reason: "",
    vacationPlan: "",
    movingPlan: "",
    dailyWalks: null,
    whatsappFollowUp: null,
    termsAccepted: false
  };

  const { id: id_pet } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    getPetById(
      id_pet,
      (data) => setPet(data),
      (error) => setError(error.message)
    );
  }, [id_pet]);

  useEffect(() => {
    if (showTerms) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showTerms]);

  if (error) {
    return <div className="not-found">{error}</div>;
  }

  if (!pet) {
    return <div className="not-found">Cargando mascota...</div>;
  }


  const handleData = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const handleRadio = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleCheckbox = (e) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const validateField = (id, value) => {
    let error = "";
    switch (id) {
      case "name":
        error = validateName(value);
        break;
      case "lastname":
        error = validateLastName(value);
        break;
      case "address":
        error = validateAddress(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "city":
        error = validateCity(value);
        break;
      case "province":
        error = validateProvince(value);
        break;
      case "dni":
        error = validateDNI(value);
        break;
      case "housingType":
        error = validateHousingType(value);
        break;
      case "ownershipStatus":
        error = validateOwnershipStatus(value);
        break;
      case "ownerConsultation":
        error = validateOwnerConsultation(value, formData.ownershipStatus === 'tenant');
        break;
      case "hasCourtyard":
        error = validateCourtyard(value);
        break;
      case "hasPets":
        error = validateHasPets(value);
        break;
      case "petsNeutered":
        error = validatePetsNeutered(value, formData.hasPets === true);
        break;
      case "hadOtherPets":
        error = validateHadOtherPets(value);
        break;
      case "reason":
        error = validateReason(value);
        break;
      case "vacationPlan":
        error = validateVacationPlan(value);
        break;
      case "movingPlan":
        error = validateMovingPlan(value);
        break;
      case "dailyWalks":
        error = validateDailyWalks(value);
        break;
      case "whatsappFollowUp":
        error = validateWhatsappFollowUp(value);
        break;
      case "termsAccepted":
        error = validateTerms(value);
        break;
    }
    setErrors(prev => ({ ...prev, [id]: error }));
    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    const fieldsToValidate = Object.keys(formData);

    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleTerms = () => {
    setShowTerms(!showTerms);
  };

  const handleSubmit = async (e) => {
    console.log(formData);

    e.preventDefault();

    if (!validateForm()) {
      errorToast("Por favor complete todos los campos correctamente");
      return;
    }

    // Simulación de envío exitoso
    successToast("¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.");
    setFormData(initialFormState);
  };




  return (
    <Container className="adoption-form-container">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="adoption-form-card">
            <Card.Header className="adoption-header">
              <h2 className="mb-0">Formulario de adopción</h2>
            </Card.Header>
            <Card.Body>
              <p className="adoption-text">
                Completa este formulario para solicitar la adopción.
              </p>
              <Form className="adoption-form" onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      value={formData.name}
                      onChange={handleData}
                      onBlur={(e) => validateField("name", e.target.value)}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="lastname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellido"
                      value={formData.lastname}
                      onChange={handleData}
                      onBlur={(e) => validateField("lastname", e.target.value)}
                      isInvalid={!!errors.lastname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastname}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="address">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      placeholder="San Lorenzo 2500"
                      value={formData.address}
                      onChange={handleData}
                      onBlur={(e) => validateField("address", e.target.value)}
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="phone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      placeholder="celular/fijo"
                      value={formData.phone}
                      onChange={handleData}
                      onBlur={(e) => validateField("phone", e.target.value)}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="city">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control
                      value={formData.city}
                      onChange={handleData}
                      onBlur={(e) => validateField("city", e.target.value)}
                      isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="province">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control
                      value={formData.province}
                      onChange={handleData}
                      onBlur={(e) => validateField("province", e.target.value)}
                      isInvalid={!!errors.province}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.province}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="dni">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control
                      value={formData.dni}
                      onChange={handleData}
                      onBlur={(e) => validateField("dni", e.target.value)}
                      isInvalid={!!errors.dni}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dni}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>¿En qué tipo de vivienda habitás?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="CASA"
                      name="housingType"
                      id="housing-house"
                      checked={formData.housingType === 'house'}
                      onChange={() => handleRadio('housingType', 'house')}
                      isInvalid={!!errors.housingType}
                    />
                    <Form.Check
                      type="radio"
                      label="DEPARTAMENTO"
                      name="housingType"
                      id="housing-apartment"
                      checked={formData.housingType === 'apartment'}
                      onChange={() => handleRadio('housingType', 'apartment')}
                      isInvalid={!!errors.housingType}
                    />
                  </div>
                  {errors.housingType && (
                    <div className="text-danger small">{errors.housingType}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Seleccioná la opción correcta:</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="PROPIETARIO"
                      name="ownershipStatus"
                      id="ownership-owner"
                      checked={formData.ownershipStatus === 'owner'}
                      onChange={() => handleRadio('ownershipStatus', 'owner')}
                      isInvalid={!!errors.ownershipStatus}
                    />
                    <Form.Check
                      type="radio"
                      label="INQUILINO"
                      name="ownershipStatus"
                      id="ownership-tenant"
                      checked={formData.ownershipStatus === 'tenant'}
                      onChange={() => handleRadio('ownershipStatus', 'tenant')}
                      isInvalid={!!errors.ownershipStatus}
                    />
                  </div>
                  {errors.ownershipStatus && (
                    <div className="text-danger small">{errors.ownershipStatus}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>En caso de alquilar, ¿lo consultaste con el dueño?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí, pregunté y admite mascotas"
                      name="ownerConsultation"
                      id="owner-yes"
                      checked={formData.ownerConsultation === 'consulted_owner_and_approved'}
                      onChange={() => handleRadio('ownerConsultation', 'consulted_owner_and_approved')}
                      disabled={formData.ownershipStatus !== 'tenant'}
                      isInvalid={!!errors.ownerConsultation}
                    />
                    <Form.Check
                      type="radio"
                      label="No pregunté, pero el edificio admite"
                      name="ownerConsultation"
                      id="owner-building-allows"
                      checked={formData.ownerConsultation === 'not_consulted_building_allows'}
                      onChange={() => handleRadio('ownerConsultation', 'not_consulted_building_allows')}
                      disabled={formData.ownershipStatus !== 'tenant'}
                      isInvalid={!!errors.ownerConsultation}
                    />
                    <Form.Check
                      type="radio"
                      label="No pregunté"
                      name="ownerConsultation"
                      id="owner-no"
                      checked={formData.ownerConsultation === 'not_consulted'}
                      onChange={() => handleRadio('ownerConsultation', 'not_consulted')}
                      disabled={formData.ownershipStatus !== 'tenant'}
                      isInvalid={!!errors.ownerConsultation}
                    />
                  </div>
                  {errors.ownerConsultation && (
                    <div className="text-danger small">{errors.ownerConsultation}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Cuenta con patio la vivienda?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="hasCourtyard"
                      id="courtyard-yes"
                      checked={formData.hasCourtyard === true}
                      onChange={() => handleRadio('hasCourtyard', true)}
                      isInvalid={!!errors.hasCourtyard}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="hasCourtyard"
                      id="courtyard-no"
                      checked={formData.hasCourtyard === false}
                      onChange={() => handleRadio('hasCourtyard', false)}
                      isInvalid={!!errors.hasCourtyard}
                    />
                  </div>
                  {errors.hasCourtyard && (
                    <div className="text-danger small">{errors.hasCourtyard}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Tenés otros animales?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="hasPets"
                      id="pets-yes"
                      checked={formData.hasPets === true}
                      onChange={() => handleRadio('hasPets', true)}
                      isInvalid={!!errors.hasPets}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="hasPets"
                      id="pets-no"
                      checked={formData.hasPets === false}
                      onChange={() => handleRadio('hasPets', false)}
                      isInvalid={!!errors.hasPets}
                    />
                  </div>
                  {errors.hasPets && (
                    <div className="text-danger small">{errors.hasPets}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>En caso afirmativo, ¿están castrados?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="petsNeutered"
                      id="pets-neutered-yes"
                      checked={formData.petsNeutered === 'yes'}
                      onChange={() => handleRadio('petsNeutered', 'yes')}
                      disabled={formData.hasPets !== true}
                      isInvalid={!!errors.petsNeutered}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="petsNeutered"
                      id="pets-neutered-no"
                      checked={formData.petsNeutered === 'no'}
                      onChange={() => handleRadio('petsNeutered', 'no')}
                      disabled={formData.hasPets !== true}
                      isInvalid={!!errors.petsNeutered}
                    />
                    <Form.Check
                      type="radio"
                      label="Algunos sí, otros no"
                      name="petsNeutered"
                      id="pets-neutered-some"
                      checked={formData.petsNeutered === 'some'}
                      onChange={() => handleRadio('petsNeutered', 'some')}
                      disabled={formData.hasPets !== true}
                      isInvalid={!!errors.petsNeutered}
                    />
                  </div>
                  {errors.petsNeutered && (
                    <div className="text-danger small">{errors.petsNeutered}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Tuviste otras mascotas?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="hadOtherPets"
                      id="had-other-pets-yes"
                      checked={formData.hadOtherPets === true}
                      onChange={() => handleRadio('hadOtherPets', true)}
                      isInvalid={!!errors.hadOtherPets}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="hadOtherPets"
                      id="had-other-pets-no"
                      checked={formData.hadOtherPets === false}
                      onChange={() => handleRadio('hadOtherPets', false)}
                      isInvalid={!!errors.hadOtherPets}
                    />
                  </div>
                  {errors.hadOtherPets && (
                    <div className="text-danger small">{errors.hadOtherPets}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="reason">
                  <Form.Label>¿Por qué querés adoptar una mascota?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.reason}
                    onChange={handleData}
                    onBlur={(e) => validateField("reason", e.target.value)}
                    isInvalid={!!errors.reason}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.reason}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="vacationPlan">
                  <Form.Label>¿Qué harías con el animal en caso de vacaciones?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.vacationPlan}
                    onChange={handleData}
                    onBlur={(e) => validateField("vacationPlan", e.target.value)}
                    isInvalid={!!errors.vacationPlan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vacationPlan}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="movingPlan">
                  <Form.Label>¿Qué harías con el animal en caso de mudanza?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.movingPlan}
                    onChange={handleData}
                    onBlur={(e) => validateField("movingPlan", e.target.value)}
                    isInvalid={!!errors.movingPlan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.movingPlan}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Contás con el tiempo para paseos diarios?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="dailyWalks"
                      id="daily-walks-yes"
                      checked={formData.dailyWalks === 'yes'}
                      onChange={() => handleRadio('dailyWalks', 'yes')}
                      isInvalid={!!errors.dailyWalks}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="dailyWalks"
                      id="daily-walks-no"
                      checked={formData.dailyWalks === 'no'}
                      onChange={() => handleRadio('dailyWalks', 'no')}
                      isInvalid={!!errors.dailyWalks}
                    />
                  </div>
                  {errors.dailyWalks && (
                    <div className="text-danger small">{errors.dailyWalks}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Estás de acuerdo con un seguimiento vía WhatsApp?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="whatsappFollowUp"
                      id="whatsapp-follow-up-yes"
                      checked={formData.whatsappFollowUp === true}
                      onChange={() => handleRadio('whatsappFollowUp', true)}
                      isInvalid={!!errors.whatsappFollowUp}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="whatsappFollowUp"
                      id="whatsapp-follow-up-no"
                      checked={formData.whatsappFollowUp === false}
                      onChange={() => handleRadio('whatsappFollowUp', false)}
                      isInvalid={!!errors.whatsappFollowUp}
                    />
                  </div>
                  {errors.whatsappFollowUp && (
                    <div className="text-danger small">{errors.whatsappFollowUp}</div>
                  )}
                </Form.Group>

                {showTerms && (
                  <>
                    <div className="terms-overlay" />
                    <div className="terms-modal">
                      <Card>
                        <Card.Body className="terms-card">
                          <Card.Title className="terms-title">Términos y Condiciones</Card.Title>
                          <Card.Text className="terms-text">
                            Completar el "formulario de adopción" es el primer paso para avanzar con la posibilidad de adoptar.
                            Es importante que sepas que la solicitud no garantiza la adopción inmediata, ya que el proceso depende de varios factores:
                            la veracidad de los datos brindados, una entrevista previa y la disponibilidad del animal elegido.
                            <br /><br />
                            Para poder considerar tu postulación, necesitamos que completes todos los campos con información real y precisa de la persona interesada en adoptar.
                            Si los datos no son completos o no se cumplen ciertos requisitos, es posible que no podamos continuar con la solicitud.
                            <br /><br />
                            Nos tomamos muy en serio cada caso, por eso puede llevarnos un tiempo responder.
                            Agradecemos tu paciencia mientras revisamos cada formulario con el cuidado que se merece.
                            <br /><br />
                            <span className="font-semibold">IMPORTANTE:</span> Está prohibido adoptar para terceros. Los adoptantes son responsables de la integridad física de la mascota.
                          </Card.Text>
                          <Button className="close-modal-btn" onClick={handleTerms}>Cerrar</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  </>
                )}

                <Form.Group className="mb-3" controlId="termsAccepted">
                  <Form.Check
                    type="checkbox"
                    label={
                      <>
                        Acepto los <span onClick={handleTerms} className="text-[#CD5C5C] opacity-80 underline cursor-pointer">términos y condiciones</span>.
                      </>
                    }
                    checked={formData.termsAccepted}
                    onChange={handleCheckbox}
                    isInvalid={!!errors.termsAccepted}
                  />
                  {errors.termsAccepted && (
                    <div className="text-danger small">{errors.termsAccepted}</div>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdoptionForm;