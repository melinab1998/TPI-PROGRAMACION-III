import {Router} from "express";
import { getPets, getPetById } from "../services/pets.services.js";

const router = Router();

router.get("/api/pets", getPets);
router.get("/api/pets/:id", getPetById);

export default router;
