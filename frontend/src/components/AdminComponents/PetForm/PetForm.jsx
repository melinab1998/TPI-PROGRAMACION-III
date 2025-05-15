import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import "./PetForm.css"

const PetForm = ({
    show,
    onHide,
    onSubmit,
    formData,
    handleChange,
    isEdit = false,
    error = '',
}) => {
    return (
        <Modal 
            show={show} 
            onHide={onHide} 
            centered 
            className="pet-form-modal custom-modal"
        >
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? `Editar Mascota: ${formData.name}` : 'Agregar Mascota'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre de la mascota"
                            required
                        />
                    </Form.Group>

                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Especie *</Form.Label>
                                <Form.Select
                                    name="species"
                                    value={formData.species}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Perro">Perro</option>
                                    <option value="Gato">Gato</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Raza *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="race"
                                    value={formData.race}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Edad (años) *</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Peso (kg) *</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.1"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sexo *</Form.Label>
                                <Form.Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Macho">Macho</option>
                                    <option value="Hembra">Hembra</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Refugio *</Form.Label>
                        <Form.Control
                            type="text"
                            name="shelter"
                            value={formData.shelter}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL de la imagen *</Form.Label>
                        <Form.Control
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Descripción de la mascota..."
                        />
                    </Form.Group>

                    <Form.Check
                        type="checkbox"
                        label="¿Adoptado?"
                        name="adopted"
                        checked={formData.adopted}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        {isEdit ? 'Guardar Cambios' : 'Guardar Mascota'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PetForm;