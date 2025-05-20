import { Router } from "express";
import {
	createRequest,
	getRequests,
	updateRequests,
} from "../services/request.services.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.post("/api/adoption", verifyToken, createRequest);
router.get("/api/adoption", verifyToken, getRequests);
router.put("/api/adoption", verifyToken, updateRequests);

export default router;
