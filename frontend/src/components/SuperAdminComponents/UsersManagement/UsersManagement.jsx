import { useState, useEffect } from "react";
import { Table, Container, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaUsers, FaSave, FaTrash, FaSearch } from "react-icons/fa";
import { getUsers, deleteUser } from "../../../services/api.services.js";
import "./UsersManagement.css";
import PetDeleteModal from "../../AdminComponents/PetDeleteModal/PetDeleteModal";
import {errorToast} from "../../../utils/notifications.js"

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);

    const filteredUsers = users.filter(user =>
        user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        getUsers(
            (data) => setUsers(data),
            (error) => {
                errorToast(error.message || "Error al obtener usuarios");
                console.error("Error fetching users:", error);
            }
        );
    }, []);

    const handleDeleteClick = (userId) => {
        const user = users.find((u) => u.id_user === userId);
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!userToDelete) return;

        deleteUser(
            userToDelete.id_user,
            () => {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id_user !== userToDelete.id_user)
                );
                setShowDeleteModal(false);
                setUserToDelete(null);
            },
            (error) => {
                console.error("Error al eliminar usuario:", error);
                errorToast("Error al eliminar usuario");
            }
        );
    };

    return (
        <Container className="users-management">
            <div className="header-section">
                <h2 className="section-title">
                    <FaUsers className="icon" /> Gestión de Usuarios
                </h2>
            </div>

            <Row className="mb-4">
                <Col>
                    <InputGroup className="search-section">
                        <InputGroup.Text className="input-group-text">
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre de usuario"
                            className="form-control search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
            </Row>

            {hasChanges && (
                <Row className="mb-3">
                    <Col className="text-end">
                        <Button
                            className="add-btn"
                            onClick={saveChanges}
                        >
                            <FaSave /> Guardar Cambios
                        </Button>
                    </Col>
                </Row>
            )}
            <Table responsive className="users-table">
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th className="actions-column">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id_user} className="user-row"> 
                            <td>{user.user_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Form.Select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id_user, e.target.value)}
                                    className="role-selector"
                                >
                                    <option value="user">Usuario</option>
                                    <option value="admin">Administrador</option>
                                    <option value="superadmin">Super Administrador</option>
                                </Form.Select>
                            </td>
                            <td className="actions-cell">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeleteClick(user.id_user)}
                                    className="delete-btn"
                                >
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
                onConfirm={confirmDelete}
                itemName={userToDelete?.user_name}
                itemType="usuario"
            />
        </Container>
    );
};

export default UsersManagement;