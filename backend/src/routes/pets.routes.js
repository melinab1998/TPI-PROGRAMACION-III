import {Router} from "express";
import { getPets, getPetById } from "../services/pets.services.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get("/api/pets", verifyToken, getPets);
router.get("/api/pets/:id", getPetById);

export default router;
