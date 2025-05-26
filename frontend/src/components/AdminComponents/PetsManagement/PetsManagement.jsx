import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Badge, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPaw, FaDog, FaCat, FaSearch } from 'react-icons/fa';
import { getPets, createPet, updatePet, deletePet } from '../../../services/api.services.js';
import PetForm from "../PetForm/PetForm"
import PetDeleteModal from '../PetDeleteModal/PetDeleteModal';
import "../PetsManagement/PetsManagement.css"
import { errorToast, successToast } from "../../../utils/notifications.js"
import ManagementSection from '../ManagementSection/ManagementSection.jsx';
import usePagination from '../../../hooks/usePagination';

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
        image_url: '',
        description: '',
        adopted: false,
    });

    const [currentPet, setCurrentPet] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const petsPerPage = 12;
    const filteredPets = (Array.isArray(pets) ? pets : []).filter(pet =>
        pet.name && pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Usar hook de paginación
    const {
        currentPage,
        totalPages,
        currentData: currentPets,
        goToPage,
        setCurrentPage: setPage
    } = usePagination(filteredPets, petsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => goToPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
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
            image_url: '',
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
                getPets(
                    (data) => setPets(data),
                    (error) => {
                        errorToast(error.message || "Error al obtener mascotas");
                        console.error("Error fetching pets:", error);
                    }
                );
                setShowAddModal(false);
                resetForm();
                successToast("Mascota agregada con éxito.");
            },
            (error) => {
                console.error("Error al agregar mascota:", error);
                errorToast("No se pudo agregar la mascota.");
            }
        );
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        updatePet(
            currentPet.id_pet,
            formData,
            (updatedPet) => {
                getPets(
                    (data) => setPets(data),
                    (error) => {
                        errorToast(error.message || "Error al obtener mascotas");
                        console.error("Error fetching pets:", error);
                    }
                );
                setShowEditModal(false);
                resetForm();
                successToast("Mascota actualizada con éxito.");
            },
            (error) => {
                console.error("Error al actualizar mascota:", error);
                errorToast("No se pudo actualizar la mascota.");
            }
        );
    };

    const handleDeleteSubmit = () => {
        deletePet(
            currentPet.id_pet,
            (deletedPet) => {
                getPets(
                    (data) => setPets(data),
                    (error) => {
                        errorToast(error.message || "Error al obtener mascotas");
                        console.error("Error fetching pets:", error);
                    }
                );
                setShowDeleteModal(false);
                setCurrentPet(null);
                successToast("Mascota eliminada con éxito.");
            },
            (error) => {
                console.error("Error al eliminar la mascota:", error);
                errorToast("No se pudo eliminar la mascota.");
            }
        );
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
            <ManagementSection
                icon={FaPaw}
                title="Gestión de Mascotas"
                searchPlaceholder="Buscar por nombre de mascota"
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                showAddButton={true}
                addButtonText="Agregar Mascota"
                onAddClick={() => setShowAddModal(true)}
            />
            <Row className="pets-list g-4">
                {currentPets.map((pet) => (
                    <Col key={pet.id_pet} xl={3} lg={4} md={6} sm={12}>
                        <Card className="pet-card-admin h-100">
                            <div className="pet-image-container">
                                <Card.Img variant="top" src={pet.image_url} alt={pet.name} />
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
            <Pagination className="mt-4 justify-content-center">{paginationItems}</Pagination>

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
                itemName={currentPet?.name}
                itemType="a la mascota"
            />
        </Container>
    );
};

export default PetsManagement;