import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaHome } from 'react-icons/fa';
import ShelterForm from "../ShelterForm/ShelterForm";
import "./SheltersManagement.css";
import PetDeleteModal from '../../AdminComponents/PetDeleteModal/PetDeleteModal';
import { getShelters, createShelter, updateShelter, deleteShelter } from '../../../services/api.services.js';
import { errorToast, successToast } from "../../../utils/notifications.js"
import ManagementSection from '../../AdminComponents/ManagementSection/ManagementSection.jsx';

const SheltersManagement = () => {
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        getShelters(
            (data) => setShelters(data),
            (error) => {
                errorToast(error.message || "Error al obtener los refugios");
                console.error("Error fetching shelters:", error);
            }
        );
    }, []);


    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });

    const [currentShelter, setCurrentShelter] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredShelters = shelters.filter(shelter =>
        shelter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            address: '',
            phone: '',
            email: ''
        });
        setCurrentShelter(null);
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();

        createShelter(
            formData,
            (newShelter) => {
                getShelters((data) => setShelters(data));
                setShowAddModal(false);
                resetForm();
                successToast("Refugio agregado con éxito.");
            },
            (error) => {
                console.error("Error al agregar refugio:", error);
                errorToast("No se pudo agregar el refugio.");
            }
        );
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        updateShelter(
            currentShelter.id_shelter,
            formData,
            (updatedShelter) => {
                getShelters((data) => setShelters(data));
                setShowEditModal(false);
                resetForm();
                successToast("Refugio actualizado con éxito.");
            },
            (error) => {
                console.error("Error al actualizar refugio:", error);
                errorToast("No se pudo actualizar el refugio.");
            }
        );
    };

    const handleDeleteSubmit = () => {


        deleteShelter(
            currentShelter.id_shelter,
            (deleteShelter) => {
                getShelters(
                    (data) => setShelters(data),
                    (error) => {
                        errorToast(error.message || "Error al obtener los refugios");
                        console.error("Error fetching shelters:", error);
                    }
                );
                setCurrentShelter(null);
                setShowDeleteModal(false);
                successToast("Refugio eliminado con éxito.");
            },
            (error) => {
                console.error("Error al eliminar refugio:", error);
                errorToast("No se pudo eliminar el refugio.");
            }
        )
    };

    const openEditModal = (shelter) => {
        setCurrentShelter(shelter);
        setFormData(shelter);
        setShowEditModal(true);
        setError('');
    };

    const openDeleteModal = (shelter) => {
        setCurrentShelter(shelter);
        setShowDeleteModal(true);
    };

    return (
        <Container className="shelters-management">
            <ManagementSection
                icon={FaHome}
                title="Gestión de Refugios"
                searchPlaceholder="Buscar por nombre de refugio"
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                showAddButton={true}
                addButtonText="Agregar Refugio"
                onAddClick={() => setShowAddModal(true)}
            />
            <Row className="shelters-list g-4">
                {filteredShelters.map((shelter) => (
                    <Col key={shelter.id_shelter} xl={3} lg={4} md={6} sm={12}>
                        <Card className="shelter-card-admin h-100">
                            <Card.Body className="d-flex flex-column">
                                <div className="shelter-header mb-2">
                                    <Card.Title className="shelter-name">
                                        <FaHome className="shelter-icon" />
                                        {shelter.name}
                                    </Card.Title>
                                </div>
                                <div className="shelter-details mb-2">
                                    <span className="shelter-detail"><strong>Dirección:</strong> {shelter.address}</span>
                                    <span className="shelter-detail"><strong>Teléfono:</strong> {shelter.phone}</span>
                                    <span className="shelter-detail"><strong>Email:</strong> {shelter.email}</span>
                                </div>
                                <div className="mt-auto">
                                    <div className="shelter-actions">
                                        <Button
                                            variant="outline-edit"
                                            className="action-btn"
                                            onClick={() => openEditModal(shelter)}
                                        >
                                            <FaEdit /> Editar
                                        </Button>
                                        <Button
                                            variant="outline-delete"
                                            className="action-btn"
                                            onClick={() => openDeleteModal(shelter)}
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

            <ShelterForm
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
                itemName={currentShelter?.name}
                itemType="el refugio"
            />
        </Container>
    );
};

export default SheltersManagement;