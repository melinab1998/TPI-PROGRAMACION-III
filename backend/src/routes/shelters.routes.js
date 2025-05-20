import {Router} from "express";
import { getAllShelters, getShelterById, createShelter, updateShelter, deleteShelter } from "../services/shelters.services.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.get("/api/shelters", verifyToken, authorizeRoles("superadmin"), getAllShelters);
router.get("/api/shelters/:id", verifyToken, authorizeRoles("superadmin"), getShelterById);
router.post("/api/shelters", verifyToken, authorizeRoles("superadmin"), createShelter);
router.put("/api/shelters/:id", verifyToken, authorizeRoles("superadmin"), updateShelter);
router.delete("/api/shelters/:id", verifyToken, authorizeRoles("superadmin"), deleteShelter);

export default router;