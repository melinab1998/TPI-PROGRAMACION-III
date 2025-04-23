import { createUser } from "../services/users.services.js";
import {Router} from "express";

const router = Router();

router.post("/users", createUser);

export default router;

