import React, { useEffect, useState } from 'react';
import { getRequests } from '../../../services/api.services.js';
import { errorToast, successToast } from "../../../utils/notifications.js";
import { Container, Table, Button } from "react-bootstrap";
const RequestsManagement = () => {
    const [requests, setRequests] = useState([])
    React.useEffect(() => {
        getRequests(
            (data) => setRequests(data),
            (error) => {
                errorToast(error.message || "Error al obtener Solicitudes");
                console.error("Error fetching requests:", error);
            }
        )
    }, [])

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Gestión de Solicitudes de Adopción</h2>
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
                    {requests.map(requests => (
                        <tr key={requests.id}>
                            <td>{requests.id}</td>
                            <td>{requests.name}</td>
                            <td>{requests.User.email}</td>
                            <td>{requests.Pet.name}</td>
                            <td>{"Pendiente"}</td>
                            <td>{new Date(requests.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Button variant="outline-primary" size="sm" className="me-2">
                                    Ver detalle
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default RequestsManagement