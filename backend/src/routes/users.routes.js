import { createUser, loginUser, getUsers, updateUserRole, deleteUser } from "../services/users.services.js";
import {Router} from "express";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get('/api/users', verifyToken, getUsers);  
router.post("/api/register", createUser);
router.post("/api/login", loginUser);
router.put('/api/users/:id/role', verifyToken, updateUserRole);
router.delete('/api/users/:id', verifyToken, deleteUser);

export default router;

