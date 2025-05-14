import React from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LostPetsForm.css';

const LostPetsForm = () => {

  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="lost-pet-card">
            <Card.Header className="lost-pet-header">
              <h2 className="mb-0">Reportar Mascota Perdida</h2>
            </Card.Header>
            <Card.Body>
              <Form>
                <h5 className="section-title">Información de la Mascota</h5>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="petName">
                      <Form.Label>Nombre de la mascota *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Toby, Luna"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="petType">
                      <Form.Label>Especie *</Form.Label>
                      <Form.Select required>
                        <option value="">Seleccione una opción</option>
                        <option value="dog">Perro</option>
                        <option value="cat">Gato</option>
                        <option value="other">Otra mascota</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="petBreed">
                      <Form.Label>Raza o tipo *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Labrador, Mestizo"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="petAge">
                      <Form.Label>Edad (años)</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="30"
                        placeholder="3"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="petGender">
                      <Form.Label>Sexo *</Form.Label>
                      <Form.Select required>
                        <option value="">Seleccione</option>
                        <option value="male">Macho</option>
                        <option value="female">Hembra</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="petDescription">
                  <Form.Label>Descripción física *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Color, tamaño, marcas distintivas, collar, etc."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="petPhoto">
                  <Form.Label>Foto de la mascota *</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    required
                  />
                  <Form.Text className="text-muted">
                    Sube una foto clara (máx. 5MB)
                  </Form.Text>
                </Form.Group>

                <hr className="section-divider" />
                <h5 className="section-title">Detalles de la Pérdida</h5>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="lossDate">
                      <Form.Label>Fecha en que se perdió *</Form.Label>
                      <Form.Control
                        type="date"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lossTime">
                      <Form.Label>Hora aproximada</Form.Label>
                      <Form.Control type="time" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="lossLocation">
                  <Form.Label>Último lugar visto *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dirección exacta, barrio o puntos de referencia"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lossDetails">
                  <Form.Label>Circunstancias (opcional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Cómo se perdió, si estaba con correa, lugares que frecuenta..."
                  />
                </Form.Group>

                <hr className="section-divider" />
                <h5 className="section-title">Tus Datos de Contacto</h5>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contactName">
                      <Form.Label>Nombre completo *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre y apellido"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contactPhone">
                      <Form.Label>Teléfono *</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Ej: 0991234567"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contactEmail">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@email.com"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contactDistrict">
                      <Form.Label>Barrio/Ciudad *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: La Floresta, Quito"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="secondary" className="btn-lost-pet-secondary" onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/');
                  }}>Cancelar</Button>
                  <Button
                    type="submit"
                    className="btn-lost-pet-primary"
                  >
                    Reportar Mascota Perdida
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LostPetsForm;