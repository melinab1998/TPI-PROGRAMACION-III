import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Pagination, Form } from 'react-bootstrap';
import { FaSearch, FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { SiReacthookform } from "react-icons/si";
import { getRequests } from '../../../services/api.services.js';
import { errorToast } from "../../../utils/notifications.js";
import './RequestsManagement.css';

const RequestsManagement = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 20;

    useEffect(() => {
        getRequests(
            (data) => setRequests(data),
            (error) => {
                errorToast(error.message || "Error al obtener solicitudes");
                console.error("Error fetching requests:", error);
            }
        );
    }, []);

    const filteredRequests = (Array.isArray(requests) ? requests : []).filter(req =>
        (req.name && req.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (req.lastname && req.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (req.User?.email && req.User.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (req.Pet?.name && req.Pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const sortedRequests = [...filteredRequests].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const indexOfLast = currentPage * requestsPerPage;
    const indexOfFirst = indexOfLast - requestsPerPage;
    const currentRequests = sortedRequests.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleViewDetail = (request) => {
        alert(`Detalle de solicitud de ${request.name}`);
    };

    const handleDelete = (request) => {
        alert(`Eliminar solicitud de ${request.name}`);
    };

    return (
        <Container className="requests-management mt-4">
            <h2 className="section-title">
                <SiReacthookform className="icon" /> Gestión de solicitudes
            </h2>
            <Form className="mb-3">
                <Form.Group controlId="search">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch />
                        </span>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre de usuario"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </Form.Group>
            </Form>
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
                            <td>{req.name} {req.lastname}</td>
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
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleDelete(req)}
                                >
                                    <FaTrash /> Eliminar
                                </Button>
                                <Button variant="outline-warning" size="sm" >
                                    <FaEdit /> Atualizar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="mt-4 justify-content-center">{paginationItems}</Pagination>
        </Container>
    );
};

export default RequestsManagement;