import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Pagination, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaClipboardList } from 'react-icons/fa';
import { getRequests, updateRequests } from '../../../services/api.services.js';
import { errorToast, successToast } from "../../../utils/notifications.js";
import './RequestsManagement.css';
import DetailModal from './DetailModal/DetailModal.jsx';
import UpdateModal from './UpdateModal/UpdateModal.jsx';
import './RequestsManagement.css';
import ManagementSection from '../ManagementSection/ManagementSection.jsx';
import usePagination from '../../../hooks/usePagination';

const RequestsManagement = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const requestsPerPage = 20;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [requestToUpdate, setRequestToUpdate] = useState(null);
    const [stateFilter, setStateFilter] = useState('');
    const [newState, setNewState] = useState("");

    useEffect(() => {
        getRequests(
            (data) => setRequests(data),
            (error) => {
                errorToast(error.message || "Error al obtener solicitudes");
                console.error("Error fetching requests:", error);
            }
        );
    }, []);

    const filteredRequests = (Array.isArray(requests) ? requests : [])
        .filter(req =>
            ((req.name && req.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (req.last_name && req.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (req.User?.email && req.User.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (req.Pet?.name && req.Pet.name.toLowerCase().includes(searchTerm.toLowerCase())))
            && (stateFilter === '' || req.state === stateFilter)
        );
    const sortedRequests = [...filteredRequests].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // hook de paginación
    const {
        currentPage,
        totalPages,
        currentData: currentRequests,
        goToPage,
        setCurrentPage: setPage
    } = usePagination(sortedRequests, requestsPerPage);

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

    const handleViewDetail = (request) => {
        setSelectedRequest(request);
        setShowDetailModal(true);
    };
    /* 
        const handleDelete = (request) => {
            alert(`Eliminar solicitud de ${request.name}`);
        }; */
    const handleUpdate = (request) => {
        setRequestToUpdate(request);
        setNewState(request.state || "Pendiente");
        setShowUpdateModal(true);
    };

    const handleSaveUpdate = () => {
        updateRequests(
            requestToUpdate.id,
            newState,
            (data) => {
                setRequests(prev =>
                    prev.map(r =>
                        r.id === requestToUpdate.id ? { ...r, state: newState } : r
                    )
                );
                setShowUpdateModal(false);
                successToast("Solicitud actualizada con éxito.")
            },
            (error) => {
                errorToast(error.message || "Error al actualizar la solicitud");
            }
        );
        setShowUpdateModal(false);
    };



    return (
        <Container className="requests-management mt-4">
            <ManagementSection
                icon={FaClipboardList}
                title="Gestión de Solicitudes"
                searchPlaceholder="Buscar por nombre de usuario"
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />
            <div className="mb-3 d-flex gap-2 flex-wrap">
                <Button
                    className={`state-filter-btn${stateFilter === '' ? ' active' : ''}`}
                    onClick={() => setStateFilter('')}
                    size="sm"
                >
                    Todas
                </Button>
                <Button
                    className={`state-filter-btn${stateFilter === 'Pendiente' ? ' active' : ''}`}
                    onClick={() => setStateFilter('Pendiente')}
                    size="sm"
                >
                    Pendiente
                </Button>
                <Button
                    className={`state-filter-btn${stateFilter === 'En revisión' ? ' active' : ''}`}
                    onClick={() => setStateFilter('En revisión')}
                    size="sm"
                >
                    En revisión
                </Button>
                <Button
                    className={`state-filter-btn${stateFilter === 'Aprobada' ? ' active' : ''}`}
                    onClick={() => setStateFilter('Aprobada')}
                    size="sm"
                >
                    Aprobada
                </Button>
                <Button
                    className={`state-filter-btn${stateFilter === 'Rechazada' ? ' active' : ''}`}
                    onClick={() => setStateFilter('Rechazada')}
                    size="sm"
                >
                    Rechazada
                </Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Mascota</th>
                        <th>Estado</th>
                        <th>Fecha de solicitud</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRequests.map(req => (
                        <tr key={req.id}>
                            <td>{req.id}</td>
                            <td>{req.name} {req.last_name}</td>
                            <td>{req.User?.email}</td>
                            <td>{req.Pet?.name}</td>
                            <td>{req.state}</td>
                            <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleViewDetail(req)}
                                >
                                    <FaEye /> Ver Detalle
                                </Button>
                                <Button variant="outline-warning" size="sm" onClick={() => handleUpdate(req)}>
                                    <FaEdit /> Actualizar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="mt-4 justify-content-center">{paginationItems}</Pagination>
            <DetailModal
                show={showDetailModal}
                onHide={() => setShowDetailModal(false)}
                request={selectedRequest || {}}
            />
            <UpdateModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                currentState={newState}
                onChangeState={setNewState}
                onSave={handleSaveUpdate}
            />
        </Container>

    );
};

export default RequestsManagement;