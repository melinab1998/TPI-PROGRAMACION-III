import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash, FaHome, FaSearch } from 'react-icons/fa';
import ShelterForm from "../ShelterForm/ShelterForm";
import "./SheltersManagement.css";
import PetDeleteModal from '../../AdminComponents/PetDeleteModal/PetDeleteModal';

const SheltersManagement = () => {
    const [shelters, setShelters] = useState([
        {
            id_shelter: 1,
            name: "Refugio Esperanza",
            address: "Calle Principal 123, Ciudad",
            phone: "555-1234",
            email: "contacto@esperanza.org"
        },
        {
            id_shelter: 2,
            name: "Hogar Felino",
            address: "Avenida Central 456, Ciudad",
            phone: "555-5678",
            email: "info@hogarfelino.org"
        },
        {
            id_shelter: 3,
            name: "Patitas Felices",
            address: "Calle Secundaria 789, Ciudad",
            phone: "555-9012",
            email: "hola@patitasfelices.org"
        },
        {
            id_shelter: 4,
            name: "Gatitos Unidos",
            address: "Boulevard Norte 321, Ciudad",
            phone: "555-3456",
            email: "adopciones@gatitosunidos.org"
        }
    ]);

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
        const newShelter = { ...formData, id_shelter: shelters.length + 1 };
        setShelters([...shelters, newShelter]);
        setShowAddModal(false);
        resetForm();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedShelters = shelters.map((shelter) =>
            shelter.id_shelter === currentShelter.id_shelter ? { ...formData, id_shelter: currentShelter.id_shelter } : shelter
        );
        setShelters(updatedShelters);
        setShowEditModal(false);
        resetForm();
    };

    const handleDeleteSubmit = () => {
        const updatedShelters = shelters.filter((shelter) => shelter.id_shelter !== currentShelter.id_shelter);
        setShelters(updatedShelters);
        setShowDeleteModal(false);
        setCurrentShelter(null);
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
            <div className="header-section">
                <h2 className="section-title">
                    <FaHome className="icon" /> Gestión de Refugios
                </h2>
                <Button className="add-btn" onClick={() => setShowAddModal(true)}>
                    <FaPlus /> Agregar Refugio
                </Button>
            </div>
            <div className="search-section mb-4">
                <div className="input-group">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Buscar por nombre de refugio"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
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