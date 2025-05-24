import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { validateName, validateSpecies, validateRace, validateAge, validateWeight, validateGender, validateShelter, validateImageUrl } from "../../../utils/validations.js";
import "./PetForm.css";

const PetForm = ({
    show,
    onHide,
    onSubmit,
    formData,
    handleChange,
    isEdit = false,
    error = '',
}) => {
    const [errors, setErrors] = useState({
        name: "",
        species: "",
        race: "",
        age: "",
        weight: "",
        gender: "",
        shelter: "",
        image_url: ""
    });

    const handleData = (e) => {
        const { name, value } = e.target;
        handleChange(e);
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "name":
                error = validateName(value);
                break;
            case "species":
                error = validateSpecies(value);
                break;
            case "race":
                error = validateRace(value);
                break;
            case "age":
                error = validateAge(value);
                break;
            case "weight":
                error = validateWeight(value);
                break;
            case "gender":
                error = validateGender(value);
                break;
            case "shelter":
                error = validateShelter(value);
                break;
            case "image_url":
                error = validateImageUrl(value);
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const validateForm = () => {
        const isValidName = validateField("name", formData.name);
        const isValidSpecies = validateField("species", formData.species);
        const isValidRace = validateField("race", formData.race);
        const isValidAge = validateField("age", formData.age);
        const isValidWeight = validateField("weight", formData.weight);
        const isValidGender = validateField("gender", formData.gender);
        const isValidShelter = validateField("shelter", formData.shelter);
        const isValidImageUrl = validateField("image_url", formData.image_url);

        return isValidName && isValidSpecies && isValidRace && isValidAge &&
            isValidWeight && isValidGender && isValidShelter && isValidImageUrl;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit(e);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            className="pet-form-modal custom-modal"
        >
            <Form onSubmit={handleSubmit}>
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
                            onChange={handleData}
                            onBlur={(e) => validateField("name", e.target.value)}
                            isInvalid={!!errors.name}
                            placeholder="Nombre de la mascota"
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Especie *</Form.Label>
                                <Form.Select
                                    name="species"
                                    value={formData.species}
                                    onChange={handleData}
                                    onBlur={(e) => validateField("species", e.target.value)}
                                    isInvalid={!!errors.species}
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Perro">Perro</option>
                                    <option value="Gato">Gato</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.species}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Raza *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="race"
                                    value={formData.race}
                                    onChange={handleData}
                                    onBlur={(e) => validateField("race", e.target.value)}
                                    isInvalid={!!errors.race}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.race}</Form.Control.Feedback>
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
                                    onChange={handleData}
                                    onBlur={(e) => validateField("age", e.target.value)}
                                    isInvalid={!!errors.age}
                                    min="0"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
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
                                    onChange={handleData}
                                    onBlur={(e) => validateField("weight", e.target.value)}
                                    isInvalid={!!errors.weight}
                                    min="0"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.weight}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sexo *</Form.Label>
                                <Form.Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleData}
                                    onBlur={(e) => validateField("gender", e.target.value)}
                                    isInvalid={!!errors.gender}
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Hembra">Hembra</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Refugio *</Form.Label>
                        <Form.Control
                            type="text"
                            name="shelter"
                            value={formData.shelter}
                            onChange={handleData}
                            onBlur={(e) => validateField("shelter", e.target.value)}
                            isInvalid={!!errors.shelter}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.shelter}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL de la imagen *</Form.Label>
                        <Form.Control
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleData}
                            onBlur={(e) => validateField("image_url", e.target.value)}
                            isInvalid={!!errors.image_url}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.image_url}</Form.Control.Feedback>
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

                    {isEdit && (
                        <Form.Check
                            type="checkbox"
                            label="¿Adoptado?"
                            name="adopted"
                            checked={formData.adopted}
                            onChange={handleChange}
                        />
                    )}
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