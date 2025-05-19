import React, { useEffect, useState } from 'react';
import { getRequests } from '../../../services/api.services.js';
import { errorToast } from "../../../utils/notifications.js";
import { Container, Table, Button, Pagination } from "react-bootstrap";
import { SiReacthookform } from "react-icons/si";

const RequestsManagement = () => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 40;

    useEffect(() => {
        getRequests(
            (data) => setRequests(data),
            (error) => {
                errorToast(error.message || "Error al obtener Solicitudes");
                console.error("Error fetching requests:", error);
            }
        )
    }, []);

    const sortedRequests = [...requests].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const indexOfLast = currentPage * requestsPerPage;
    const indexOfFirst = indexOfLast - requestsPerPage;
    const currentRequests = sortedRequests.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(requests.length / requestsPerPage);

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

    return (
        <Container className="mt-4">
            <h2 className="section-title">
                <SiReacthookform className="icon" /> Gestión de solicitudes
            </h2>
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
                    {currentRequests.map(requests => (
                        <tr key={requests.id}>
                            <td>{requests.id}</td>
                            <td>{requests.name}</td>
                            <td>{requests.User.email}</td>
                            <td>{requests.Pet.name}</td>
                            <td>{requests.state}</td>
                            <td>{new Date(requests.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Button variant="outline-primary" size="sm" className="me-2">
                                    Ver detalle
                                </Button>
                                <Button variant="outline-danger" size="sm" className="me-2">
                                    Eliminar
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                    Actualizar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>{paginationItems}</Pagination>
        </Container>
    );
}

export default RequestsManagement;