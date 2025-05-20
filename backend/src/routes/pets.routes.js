import {Router} from "express";
import { getPets, getPetById, createPet, updatePet, deletePet } from "../services/pets.services.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.get("/api/pets", getPets);
router.get("/api/pets/:id", getPetById);
router.post("/api/pets", verifyToken, authorizeRoles("admin", "superadmin"), createPet);
router.put("/api/pets/:id", verifyToken, authorizeRoles("admin", "superadmin"), updatePet);
router.delete("/api/pets/:id", verifyToken, authorizeRoles("admin", "superadmin"), deletePet);

export default router;
