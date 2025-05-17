import { createUser, loginUser, getUsers, updateUserRole, deleteUser } from "../services/users.services.js";
import {Router} from "express";

const router = Router();

router.get('/api/users', getUsers);  
router.post("/api/register", createUser);
router.post("/api/login", loginUser);
router.put('/api/users/:id/role', updateUserRole);
router.delete('/api/users/:id', deleteUser);

export default router;

