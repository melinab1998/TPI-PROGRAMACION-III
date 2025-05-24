import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import './AdoptionForm.css';
import { errorToast, successToast} from '../../utils/notifications.js';
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
import { AuthenticationContext } from '../../services/auth//AuthContext.jsx';
import { createAdoptionForm } from '../../services/api.services.js';


const AdoptionForm = () => {
  const { id: id_pet } = useParams();
  const { userId: id_user } = useContext(AuthenticationContext);
  const initialFormState = {
    id_pet: id_pet,
    id_user: "",
    name: "",
    last_name: "",
    address: "",
    phone: "",
    city: "",
    province: "",
    dni: "",
    housing_type: null,
    ownership_status: null,
    owner_consultation: null,
    has_courtyard: null,
    has_pets: null,
    pets_neutered: null,
    had_other_pets: null,
    reason: "",
    vacation_plan: "",
    moving_plan: "",
    daily_walks: null,
    whatsapp_follow_up: null,
    terms_accepted: false
  };


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

  useEffect(() => {
    setFormData(prev => ({ ...prev, id_user: id_user }));
  }, [id_user]);

  if (error) {
    return <div className="not-found">{error}</div>;
  }

  if (!pet || !id_user) {
    return <div className="not-found">Cargando formulario...</div>;
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
      case "last_name":
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
      case "housing_type":
        error = validateHousingType(value);
        break;
      case "ownership_status":
        error = validateOwnershipStatus(value);
        break;
      case "owner_consultation":
        error = validateOwnerConsultation(value, formData.ownership_status === 'tenant');
        break;
      case "has_courtyard":
        error = validateCourtyard(value);
        break;
      case "has_pets":
        error = validateHasPets(value);
        break;
      case "pets_neutered":
        error = validatePetsNeutered(value, formData.has_pets === true);
        break;
      case "had_other_pets":
        error = validateHadOtherPets(value);
        break;
      case "reason":
        error = validateReason(value);
        break;
      case "vacation_plan":
        error = validateVacationPlan(value);
        break;
      case "moving_plan":
        error = validateMovingPlan(value);
        break;
      case "daily_walks":
        error = validateDailyWalks(value);
        break;
      case "whatsapp_follow_up":
        error = validateWhatsappFollowUp(value);
        break;
      case "terms_accepted":
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
    e.preventDefault();

    if (!formData.id_user) {
      errorToast("No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.");
      return;
    }

    if (!validateForm()) {
      errorToast("Por favor complete todos los campos correctamente");
      return;
    }


    // Definí las funciones acá:
    const onSuccess = () => {
      successToast("¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.");
      setFormData({
        ...initialFormState,
        id_user,
        id_pet,
      });
    };

    const onError = (error) => {
      console.log("Error recibido:", error);
    
      const errorMsg = error?.data?.error || error?.message;
    
      if (errorMsg?.includes("Ya existe una solicitud")) {
        errorToast("Ya has enviado una solicitud para esta mascota.");
      } else if (errorMsg?.includes("validación")) {
        errorToast("Por favor completá todos los campos correctamente.");
      } else {
        errorToast("Hubo un error al enviar el formulario.");
      }
    };
    

    createAdoptionForm(formData, onSuccess, onError);
  };




  return (
    <Container className="adoption-form-container">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="adoption-form-card">
            <Card.Header className="adoption-header">
              <h2 className="mb-0">Formulario de adopción para {pet.name} </h2>
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

                  <Form.Group as={Col} controlId="last_name">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellido"
                      value={formData.last_name}
                      onChange={handleData}
                      onBlur={(e) => validateField("last_name", e.target.value)}
                      isInvalid={!!errors.last_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.last_name}
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
                      name="housing_type"
                      id="housing-house"
                      checked={formData.housing_type === 'Casa'}
                      onChange={() => handleRadio('housing_type', 'Casa')}
                      isInvalid={!!errors.housing_type}
                    />
                    <Form.Check
                      type="radio"
                      label="DEPARTAMENTO"
                      name="housing_type"
                      id="housing-apartment"
                      checked={formData.housing_type === 'Departamento'}
                      onChange={() => handleRadio('housing_type', 'Departamento')}
                      isInvalid={!!errors.housing_type}
                    />
                  </div>
                  {errors.housing_type && (
                    <div className="text-danger small">{errors.housing_type}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Seleccioná la opción correcta:</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="PROPIETARIO"
                      name="ownership_status"
                      id="ownership-owner"
                      checked={formData.ownership_status === 'Propietario'}
                      onChange={() => handleRadio('ownership_status', 'Propietario')}
                      isInvalid={!!errors.ownership_status}
                    />
                    <Form.Check
                      type="radio"
                      label="INQUILINO"
                      name="ownership_status"
                      id="ownership-tenant"
                      checked={formData.ownership_status === 'Inquilino'}
                      onChange={() => handleRadio('ownership_status', 'Inquilino')}
                      isInvalid={!!errors.ownership_status}
                    />
                  </div>
                  {errors.ownership_status && (
                    <div className="text-danger small">{errors.ownership_status}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>En caso de alquilar, ¿lo consultaste con el dueño?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí, pregunté y admite mascotas"
                      name="owner_consultation"
                      id="owner-yes"
                      checked={formData.owner_consultation === 'consulted_owner_and_approved'}
                      onChange={() => handleRadio('owner_consultation', 'consulted_owner_and_approved')}
                      disabled={formData.ownership_status !== 'Inquilino'}
                      isInvalid={!!errors.owner_consultation}
                    />
                    <Form.Check
                      type="radio"
                      label="No pregunté, pero el edificio admite"
                      name="owner_consultation"
                      id="owner-building-allows"
                      checked={formData.owner_consultation === 'not_consulted_building_allows'}
                      onChange={() => handleRadio('owner_consultation', 'not_consulted_building_allows')}
                      disabled={formData.ownership_status !== 'Inquilino'}
                      isInvalid={!!errors.owner_consultation}
                    />
                    <Form.Check
                      type="radio"
                      label="No pregunté"
                      name="owner_consultation"
                      id="owner-no"
                      checked={formData.owner_consultation === 'not_consulted'}
                      onChange={() => handleRadio('owner_consultation', 'not_consulted')}
                      disabled={formData.ownership_status !== 'Inquilino'}
                      isInvalid={!!errors.owner_consultation}
                    />
                  </div>
                  {errors.owner_consultation && (
                    <div className="text-danger small">{errors.owner_consultation}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Cuenta con patio la vivienda?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="has_courtyard"
                      id="courtyard-yes"
                      checked={formData.has_courtyard === true}
                      onChange={() => handleRadio('has_courtyard', true)}
                      isInvalid={!!errors.has_courtyard}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="has_courtyard"
                      id="courtyard-no"
                      checked={formData.has_courtyard === false}
                      onChange={() => handleRadio('has_courtyard', false)}
                      isInvalid={!!errors.has_courtyard}
                    />
                  </div>
                  {errors.has_courtyard && (
                    <div className="text-danger small">{errors.has_courtyard}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Tenés otros animales?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="has_pets"
                      id="pets-yes"
                      checked={formData.has_pets === true}
                      onChange={() => handleRadio('has_pets', true)}
                      isInvalid={!!errors.has_pets}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="has_pets"
                      id="pets-no"
                      checked={formData.has_pets === false}
                      onChange={() => handleRadio('has_pets', false)}
                      isInvalid={!!errors.has_pets}
                    />
                  </div>
                  {errors.has_pets && (
                    <div className="text-danger small">{errors.has_pets}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>En caso afirmativo, ¿están castrados?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="pets_neutered"
                      id="pets-neutered-yes"
                      checked={formData.pets_neutered === 'yes'}
                      onChange={() => handleRadio('pets_neutered', 'yes')}
                      disabled={formData.has_pets !== true}
                      isInvalid={!!errors.pets_neutered}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="pets_neutered"
                      id="pets-neutered-no"
                      checked={formData.pets_neutered === 'no'}
                      onChange={() => handleRadio('pets_neutered', 'no')}
                      disabled={formData.has_pets !== true}
                      isInvalid={!!errors.pets_neutered}
                    />
                    <Form.Check
                      type="radio"
                      label="Algunos sí, otros no"
                      name="pets_neutered"
                      id="pets-neutered-some"
                      checked={formData.pets_neutered === 'some'}
                      onChange={() => handleRadio('pets_neutered', 'some')}
                      disabled={formData.has_pets !== true}
                      isInvalid={!!errors.pets_neutered}
                    />
                  </div>
                  {errors.pets_neutered && (
                    <div className="text-danger small">{errors.pets_neutered}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Tuviste otras mascotas?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="had_other_pets"
                      id="had-other-pets-yes"
                      checked={formData.had_other_pets === true}
                      onChange={() => handleRadio('had_other_pets', true)}
                      isInvalid={!!errors.had_other_pets}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="had_other_pets"
                      id="had-other-pets-no"
                      checked={formData.had_other_pets === false}
                      onChange={() => handleRadio('had_other_pets', false)}
                      isInvalid={!!errors.had_other_pets}
                    />
                  </div>
                  {errors.had_other_pets && (
                    <div className="text-danger small">{errors.had_other_pets}</div>
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

                <Form.Group className="mb-3" controlId="vacation_plan">
                  <Form.Label>¿Qué harías con el animal en caso de vacaciones?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.vacation_plan}
                    onChange={handleData}
                    onBlur={(e) => validateField("vacation_plan", e.target.value)}
                    isInvalid={!!errors.vacation_plan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vacation_plan}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="moving_plan">
                  <Form.Label>¿Qué harías con el animal en caso de mudanza?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.moving_plan}
                    onChange={handleData}
                    onBlur={(e) => validateField("moving_plan", e.target.value)}
                    isInvalid={!!errors.moving_plan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.moving_plan}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Contás con el tiempo para paseos diarios?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="daily_walks"
                      id="daily-walks-yes"
                      checked={formData.daily_walks === 'yes'}
                      onChange={() => handleRadio('daily_walks', 'yes')}
                      isInvalid={!!errors.daily_walks}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="daily_walks"
                      id="daily-walks-no"
                      checked={formData.daily_walks === 'no'}
                      onChange={() => handleRadio('daily_walks', 'no')}
                      isInvalid={!!errors.daily_walks}
                    />
                  </div>
                  {errors.daily_walks && (
                    <div className="text-danger small">{errors.daily_walks}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Estás de acuerdo con un seguimiento vía WhatsApp?</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Sí"
                      name="whatsapp_follow_up"
                      id="whatsapp-follow-up-yes"
                      checked={formData.whatsapp_follow_up === true}
                      onChange={() => handleRadio('whatsapp_follow_up', true)}
                      isInvalid={!!errors.whatsapp_follow_up}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="whatsapp_follow_up"
                      id="whatsapp-follow-up-no"
                      checked={formData.whatsapp_follow_up === false}
                      onChange={() => handleRadio('whatsapp_follow_up', false)}
                      isInvalid={!!errors.whatsapp_follow_up}
                    />
                  </div>
                  {errors.whatsapp_follow_up && (
                    <div className="text-danger small">{errors.whatsapp_follow_up}</div>
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

                <Form.Group className="mb-3" controlId="terms_accepted">
                  <Form.Check
                    type="checkbox"
                    label={
                      <>
                        Acepto los <span onClick={handleTerms} className="text-[#CD5C5C] opacity-80 underline cursor-pointer">términos y condiciones</span>.
                      </>
                    }
                    checked={formData.terms_accepted}
                    onChange={handleCheckbox}
                    isInvalid={!!errors.terms_accepted}
                  />
                  {errors.terms_accepted && (
                    <div className="text-danger small">{errors.terms_accepted}</div>
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