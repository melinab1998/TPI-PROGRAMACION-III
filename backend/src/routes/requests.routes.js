import { Router } from "express";
import { createRequest } from "../services/request.services.js";
import { verifyToken } from "../middlewares/auth.js";
import { getPetById } from "../services/pets.services.js";

const router = Router();

router.post("/api/adoption/:id", verifyToken, createRequest);
router.get("/api/adoption/:id", getPetById);

export default router;
