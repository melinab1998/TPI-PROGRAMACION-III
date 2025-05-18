import { Router } from "express";
import { createRequest } from "../services/request.services.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.post("/api/adoption/", verifyToken, createRequest);

export default router;
