import { createUser, loginUser } from "../services/users.services.js";
import {Router} from "express";

const router = Router();

router.post("/api/register", createUser);
router.post("/api/login", loginUser);

export default router;

