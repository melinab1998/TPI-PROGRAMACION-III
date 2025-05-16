import {Router} from "express";
import { getPets, getPetById, createPet, updatePet } from "../services/pets.services.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get("/api/pets", verifyToken, getPets);
router.get("/api/pets/:id", getPetById);
router.post("/api/pets", createPet);
router.put("/api/pets/:id", updatePet);

export default router;
