import { Router } from "express";
import { getShelters, getShelterById, createShelter, updateShelter, deleteShelter } from "../services/shelters.services.js"
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get('/', verifyToken, getShelters);
router.get('/:id', verifyToken, getShelterById);
router.post('/', verifyToken, createShelter);
router.put('/:id', verifyToken, updateShelter);
router.delete('/:id', verifyToken, deleteShelter);

export default Router;