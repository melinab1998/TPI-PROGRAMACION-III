import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import PetDeleteModal from "../PetManagement/PetDeleteModal/PetDeleteModal"
import RequestDetailsModal from './RequestDetailsModal/RequestDetailsModal'

const RequestManagement = ({ requests }) => {
    const [pendingRequests, setPendingRequests] = useState(requests);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleApprove = (id) => {
        setPendingRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: 'approved' } : req
        ));
    };

    const handleReject = (id) => {
        setPendingRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: 'rejected' } : req
        ));
    };

    const handleDelete = () => {
        if (selectedRequest) {
            setPendingRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
            setSelectedRequest(null);
            setShowDeleteModal(false);
        }
    };

    const openDeleteModal = (request) => {
        setSelectedRequest(request);
        setShowDeleteModal(true);
    };

    const openDetailsModal = (request) => {
        setSelectedRequest(request);
        setShowDetailsModal(true);
    };

    return (
        <div className="request-management mt-4">
            <h2>Gestión de Solicitudes</h2>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Ciudad</th>
                        <th>Mascota</th>
                        <th>Refugio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingRequests.map((req) => (
                        <tr key={req.id} onClick={() => openDetailsModal(req)} style={{ cursor: 'pointer' }}>
                            <td>{req.name}</td>
                            <td>{req.lastname}</td>
                            <td>{req.city}</td>
                            <td>{req.petName}</td>
                            <td>{req.shelterName}</td>
                            <td>
                                <Badge bg={
                                    req.status === 'approved' ? 'success' :
                                        req.status === 'rejected' ? 'danger' :
                                            'warning'
                                }>
                                    {req.status === 'approved' ? 'Aprobado' :
                                        req.status === 'rejected' ? 'Rechazado' :
                                            'Pendiente'}
                                </Badge>
                            </td>
                            <td onClick={e => e.stopPropagation()}>
                                <Button variant="success" className="me-2" onClick={() => handleApprove(req.id)} disabled={req.status !== 'pending'}>
                                    <FaCheck />
                                </Button>
                                <Button variant="warning" className="me-2" onClick={() => handleReject(req.id)} disabled={req.status !== 'pending'}>
                                    <FaTimes />
                                </Button>
                                <Button variant="danger" onClick={() => openDeleteModal(req)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <PetDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                petName={selectedRequest?.petName}
            />

            <RequestDetailsModal
                show={showDetailsModal}
                onHide={() => setShowDetailsModal(false)}
                request={selectedRequest}
            />
        </div>
    );
};

export default RequestManagement;