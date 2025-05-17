import { useState } from "react";
import { Table, Container, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaUsers, FaSave, FaTrash, FaSearch } from "react-icons/fa";
import DeleteConfirmationModal from "../../AdminComponents/PetDeleteModal/PetDeleteModal"
import "./UsersManagement.css";

const UsersManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, user_name: "Juan Pérez", email: "juan@example.com", role: "user" },
        { id: 2, user_name: "Ana Gómez", email: "ana@example.com", role: "admin" },
        { id: 3, user_name: "Laura Smith", email: "laura@example.com", role: "superadmin" }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);

    const filteredUsers = users.filter(user =>
        user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (userId) => {
        const user = users.find(u => u.id === userId);
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setShowDeleteModal(false);
    };

    const handleRoleChange = (id, newRole) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === id ? { ...user, role: newRole } : user
            )
        );
        setHasChanges(true);
    };

    const saveChanges = () => {
        // Aquí iría la lógica para guardar los cambios en la API
        console.log("Changes saved:", users);
        setHasChanges(false);
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
                        <tr key={user.id} className="user-row"> {/* Añadida clase user-row */}
                            <td>{user.user_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Form.Select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
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
                                    onClick={() => handleDeleteClick(user.id)}
                                    className="delete-btn"
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <DeleteConfirmationModal
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