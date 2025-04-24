import { createUser } from "../services/users.services.js";
import {Router} from "express";

const router = Router();

router.post("/api/users", createUser);

export default router;

