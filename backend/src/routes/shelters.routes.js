import {Router} from "express";
import { getAllShelters, getShelterById, createShelter, updateShelter, deleteShelter } from "../services/shelters.services.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get("/api/shelters", verifyToken, getAllShelters);
router.get("/api/shelters/:id", getShelterById);
router.post("/api/shelters", verifyToken, createShelter);
router.put("/api/shelters/:id", verifyToken, updateShelter);
router.delete("/api/shelters/:id", verifyToken, deleteShelter);

export default router;