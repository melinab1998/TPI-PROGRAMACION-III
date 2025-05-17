import {Router} from "express";
import { getPets, getPetById, createPet, updatePet, deletePet } from "../services/pets.services.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get("/api/pets", verifyToken, getPets);
router.get("/api/pets/:id", getPetById);
router.post("/api/pets", verifyToken, createPet);
router.put("/api/pets/:id", verifyToken, updatePet);
router.delete("/api/pets/:id", verifyToken, deletePet);

export default router;
