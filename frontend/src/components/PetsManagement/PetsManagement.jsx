import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from "react-bootstrap";
import { FaPaw, FaCat, FaDog, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "./PetsManagement.css";

const PetsManagement = () => {
  // Datos de ejemplo
  const [pets, setPets] = useState([
    {
      id_pet: 1,
      name: "Max",
      species: "Perro",
      race: "Labrador",
      age: 3,
      weight: 25.5,
      gender: "Macho",
      description: "Perro juguetón y cariñoso.",
      shelter: "Refugio Esperanza",
      adopted: false,
      imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300"
    },
    {
      id_pet: 2,
      name: "Luna",
      species: "Gato",
      race: "Siamés",
      age: 2,
      weight: 4.2,
      gender: "Hembra",
      description: "Gata tranquila que disfruta de los mimos.",
      shelter: "Hogar Felino",
      adopted: true,
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300"
    },
    {
      id_pet: 3,
      name: "Rocky",
      species: "Perro",
      race: "Bulldog",
      age: 4,
      weight: 18.0,
      gender: "Macho",
      description: "Tranquilo y amigable con niños.",
      shelter: "Patitas Felices",
      adopted: false,
      imageUrl: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300"
    },
    {
      id_pet: 4,
      name: "Mía",
      species: "Gato",
      race: "Persa",
      age: 1,
      weight: 3.8,
      gender: "Hembra",
      description: "Juguetona y curiosa.",
      shelter: "Gatitos Unidos",
      adopted: false,
      imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=300"
    }
  ]);

  // Estados para los modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [error, setError] = useState(null);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    species: "Perro",
    race: "",
    age: "",
    weight: "",
    gender: "Macho",
    description: "",
    shelter: "",
    imageUrl: "",
    adopted: false
  });

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Abrir modal de edición
  const handleEditClick = (pet) => {
    setCurrentPet(pet);
    setFormData({
      name: pet.name,
      species: pet.species,
      race: pet.race,
      age: pet.age.toString(),
      weight: pet.weight.toString(),
      gender: pet.gender,
      description: pet.description,
      shelter: pet.shelter,
      imageUrl: pet.imageUrl,
      adopted: pet.adopted
    });
    setShowEditModal(true);
    setError(null);
  };

  // Abrir modal de eliminación
  const handleDeleteClick = (pet) => {
    setCurrentPet(pet);
    setShowDeleteModal(true);
  };

  // Agregar nueva mascota
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newPet = {
      id_pet: Math.max(...pets.map(p => p.id_pet), 0) + 1,
      ...formData,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight)
    };

    setPets([...pets, newPet]);
    setShowAddModal(false);
    resetForm();
  };

  // Editar mascota existente
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedPets = pets.map(pet => 
      pet.id_pet === currentPet.id_pet ? { 
        ...pet,
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight)
      } : pet
    );

    setPets(updatedPets);
    setShowEditModal(false);
    resetForm();
  };

  // Eliminar mascota
  const handleDeleteSubmit = () => {
    setPets(pets.filter(pet => pet.id_pet !== currentPet.id_pet));
    setShowDeleteModal(false);
  };

  // Validar formulario
  const validateForm = () => {
    if (!formData.name || !formData.race || !formData.age || !formData.weight || !formData.shelter || !formData.imageUrl) {
      setError("Por favor complete todos los campos requeridos");
      return false;
    }
    if (isNaN(formData.age) || formData.age <= 0) {
      setError("La edad debe ser un número positivo");
      return false;
    }
    if (isNaN(formData.weight)) {
      setError("El peso debe ser un número válido");
      return false;
    }
    setError(null);
    return true;
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      name: "",
      species: "Perro",
      race: "",
      age: "",
      weight: "",
      gender: "Macho",
      description: "",
      shelter: "",
      imageUrl: "",
      adopted: false
    });
    setError(null);
  };

  return (
    <Container className="pets-management">
      <div className="header-section">
        <h2 className="section-title">
          <FaPaw className="icon" /> Gestión de Mascotas
        </h2>
        <Button className="add-btn" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Agregar Mascota
        </Button>
      </div>

      <Row className="pets-list g-4">
        {pets.map((pet) => (
          <Col key={pet.id_pet} xl={3} lg={4} md={6} sm={12}>
            <Card className="pet-card-admin h-100">
              <div className="pet-image-container">
                <Card.Img variant="top" src={pet.imageUrl} alt={pet.name} />
                {pet.adopted && (
                  <Badge pill className="adopted-badge">
                    Adoptado
                  </Badge>
                )}
              </div>
              <Card.Body className="d-flex flex-column">
                <div className="pet-header mb-2">
                  <Card.Title className="pet-name">
                    {pet.species === "Perro" ? <FaDog className="species-icon" /> : <FaCat className="species-icon" />}
                    {pet.name}
                  </Card.Title>
                  <span className="pet-shelter">{pet.shelter}</span>
                </div>
                <div className="pet-details mb-2">
                  <span className="pet-detail"><strong>Raza:</strong> {pet.race}</span>
                  <span className="pet-detail"><strong>Edad:</strong> {pet.age} años</span>
                </div>
                <div className="mt-auto">
                  <div className="pet-actions">
                    <Button variant="outline-edit" className="action-btn" onClick={() => handleEditClick(pet)}>
                      <FaEdit /> Editar
                    </Button>
                    <Button variant="outline-delete" className="action-btn" onClick={() => handleDeleteClick(pet)}>
                      <FaTrash /> Eliminar
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para agregar mascota */}
      <Modal show={showAddModal} onHide={() => { setShowAddModal(false); resetForm(); }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Mascota</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nombre de la mascota"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especie *</Form.Label>
                  <Form.Select
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Raza *</Form.Label>
                  <Form.Control
                    type="text"
                    name="race"
                    value={formData.race}
                    onChange={handleInputChange}
                    placeholder="Raza de la mascota"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Edad (años) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Peso (kg) *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0.0"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Sexo *</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
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
                onChange={handleInputChange}
                placeholder="Nombre del refugio"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la imagen *</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descripción de la mascota..."
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="¿Adoptado?"
              name="adopted"
              checked={formData.adopted}
              onChange={handleInputChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowAddModal(false); resetForm(); }}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Mascota
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal para editar mascota */}
      <Modal show={showEditModal} onHide={() => { setShowEditModal(false); resetForm(); }}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mascota: {currentPet?.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especie *</Form.Label>
                  <Form.Select
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Raza *</Form.Label>
                  <Form.Control
                    type="text"
                    name="race"
                    value={formData.race}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Edad (años) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Peso (kg) *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Sexo *</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la imagen *</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="¿Adoptado?"
              name="adopted"
              checked={formData.adopted}
              onChange={handleInputChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowEditModal(false); resetForm(); }}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal para eliminar mascota */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar a <strong>{currentPet?.name}</strong>? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteSubmit}>
            <FaTrash /> Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PetsManagement;