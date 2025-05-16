import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash, FaPaw, FaDog, FaCat, FaSearch } from 'react-icons/fa';
import { getPets, createPet, updatePet } from '../../../services/api.services.js';
import PetForm from "../PetForm/PetForm"
import PetDeleteModal from '../PetDeleteModal/PetDeleteModal';
import "../PetsManagement/PetsManagement.css"

const PetsManagement = () => {
    const [pets, setPets] = useState([]);
     useEffect(() => {
        getPets(
          (data) => setPets(data),
          (error) => {
            errorToast(error.message || "Error al obtener mascotas");
            console.error("Error fetching pets:", error);
          }
        );
      }, []);


    const [formData, setFormData] = useState({
        name: '',
        species: 'Perro',
        race: '',
        age: '',
        weight: '',
        gender: 'Macho',
        shelter: '',
        imageUrl: '',
        description: '',
        adopted: false,
    });

    const [currentPet, setCurrentPet] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const filteredPets = pets.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            species: 'Perro',
            race: '',
            age: '',
            weight: '',
            gender: 'Macho',
            shelter: '',
            imageUrl: '',
            description: '',
            adopted: false,
        });
        setCurrentPet(null);
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        
        createPet(
            formData,
            (newPet) => {
                setPets([...pets, newPet]);
                setShowAddModal(false);
                resetForm();
            },
            (error) => {
                console.error("Error al agregar mascota:", error);
                setError("No se pudo agregar la mascota.");
            }
        );
    };
    
    const handleEditSubmit = (e) => {
        e.preventDefault();
    
        updatePet(
            currentPet.id_pet,   
            formData,             
            (updatedPet) => {     
                const updatedPets = pets.map((pet) =>
                    pet.id_pet === updatedPet.id_pet ? updatedPet : pet
                );
                setPets(updatedPets);       
                setShowEditModal(false);    
                resetForm();                
            },
            (error) => {
                console.error("Error al actualizar mascota:", error);
                setError("No se pudo actualizar la mascota.");
            }
        );
    };
    const handleDeleteSubmit = () => {
        const updatedPets = pets.filter((pet) => pet.id_pet !== currentPet.id_pet);
        setPets(updatedPets);
        setShowDeleteModal(false);
        setCurrentPet(null);
    };

    const openEditModal = (pet) => {
        setCurrentPet(pet);
        setFormData(pet);
        setShowEditModal(true);
        setError('');
    };

    const openDeleteModal = (pet) => {
        setCurrentPet(pet);
        setShowDeleteModal(true);
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
            <div className="search-section mb-4">
                <div className="input-group">
                    <span className="input-group-text">
                        <FaSearch/>
                    </span>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Buscar por nombre de mascota"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <Row className="pets-list g-4">
                {filteredPets.map((pet) => (
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
                                        <Button
                                            variant="outline-edit"
                                            className="action-btn"
                                            onClick={() => openEditModal(pet)}
                                        >
                                            <FaEdit /> Editar
                                        </Button>
                                        <Button
                                            variant="outline-delete"
                                            className="action-btn"
                                            onClick={() => openDeleteModal(pet)}
                                        >
                                            <FaTrash /> Eliminar
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <PetForm
                show={showAddModal || showEditModal}
                onHide={() => {
                    showAddModal ? setShowAddModal(false) : setShowEditModal(false);
                    resetForm();
                }}
                onSubmit={showAddModal ? handleAddSubmit : handleEditSubmit}
                formData={formData}
                handleChange={handleInputChange}
                isEdit={showEditModal}
                error={error}
            />

            <PetDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteSubmit}
                petName={currentPet?.name}
            />
        </Container>
    );
};

export default PetsManagement;