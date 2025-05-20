import { createUser, loginUser, getUsers, updateUserRole, deleteUser } from "../services/users.services.js";
import {Router} from "express";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.get('/api/users', verifyToken, authorizeRoles("superadmin"), getUsers);  
router.post("/api/register", createUser);
router.post("/api/login", loginUser);
router.put('/api/users/:id/role', verifyToken, authorizeRoles("superadmin"), updateUserRole);
router.delete('/api/users/:id', verifyToken, authorizeRoles("superadmin"), deleteUser);

export default router;

