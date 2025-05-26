import { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col, InputGroup, Pagination } from "react-bootstrap";
import { FaUsers, FaSave, FaTrash, FaSearch } from "react-icons/fa";
import { getUsers, deleteUser, updateUserRole } from "../../../services/api.services.js";
import "./UsersManagement.css";
import PetDeleteModal from "../../AdminComponents/PetDeleteModal/PetDeleteModal";
import { errorToast, successToast } from "../../../utils/notifications.js"
import ManagementSection from "../../AdminComponents/ManagementSection/ManagementSection.jsx";
import usePagination from '../../../hooks/usePagination';


const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [modifiedUsers, setModifiedUsers] = useState({});

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
                successToast(`Usuario "${userToDelete.user_name}" eliminado correctamente.`);
                setShowDeleteModal(false);
                setUserToDelete(null);
            },
            (error) => {
                console.error("Error al eliminar usuario:", error);
                errorToast(`Error al eliminar usuario "${userToDelete.user_name}".`);
            }
        );
    };

    const handleRoleChange = (userId, newRole) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id_user === userId ? { ...user, role: newRole } : user
            )
        );

        setModifiedUsers((prev) => ({
            ...prev,
            [userId]: newRole,
        }));

        setHasChanges(true);
    };

    const saveChanges = () => {
        const entries = Object.entries(modifiedUsers);
        if (entries.length === 0) {
            errorToast("No hay cambios para guardar.");
            return;
        }

        let successCount = 0;
        let failCount = 0;

        entries.forEach(([id, newRole]) => {
            updateUserRole(
                id,
                newRole,
                () => {
                    successCount++;
                    if (successCount + failCount === entries.length) {
                        postSave(successCount, failCount);
                    }
                },
                (error) => {
                    console.error(`Error al actualizar rol de usuario ${id}:`, error);
                    failCount++;
                    if (successCount + failCount === entries.length) {
                        postSave(successCount, failCount);
                    }
                }
            );
        });
    };

    const postSave = (successCount, failCount) => {
        if (successCount > 0) {
            successToast(`${successCount} rol(es) actualizado(s) correctamente.`);
        }
        if (failCount > 0) {
            errorToast(`${failCount} cambio(s) de rol no se pudieron guardar.`);
        }

        setModifiedUsers({});
        setHasChanges(false);
    };

    const usersPerPage = 15;
    const filteredUsers = users.filter((user) =>
        user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hook de paginación
    const {
        currentPage,
        totalPages,
        currentData: currentUsers,
        goToPage,
        setCurrentPage: setPage
    } = usePagination(filteredUsers, usersPerPage);

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

    return (
        <Container className="users-management">
            <ManagementSection
                icon={FaUsers}
                title="Gestión de Usuarios"
                searchPlaceholder="Buscar por nombre de usuario"
                searchTerm={searchTerm}
                onSearchChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            />


            {hasChanges && (
                <Row className="mb-3">
                    <Col className="text-end">
                        <Button className="add-btn" onClick={saveChanges}>
                            <FaSave /> Guardar Cambios
                        </Button>
                    </Col>
                </Row>
            )}

            <table responsive className="users-table">
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th className="actions-column">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id_user} className="user-row">
                            <td>{user.user_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Form.Select
                                    value={user.role}
                                    onChange={(e) =>
                                        handleRoleChange(user.id_user, e.target.value)
                                    }
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
            </table>
            <Pagination className="mt-4 justify-content-center">{paginationItems}</Pagination>

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