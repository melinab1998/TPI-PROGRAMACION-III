import { Router } from "express";
import { createRequest, getRequests } from "../services/request.services.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.post("/api/adoption/", verifyToken, createRequest);
router.get("/api/adoption/", verifyToken, getRequests);

export default router;
