import { Router } from "express";
import {
	createRequest,
	getRequests,
	updateRequests,
} from "../services/request.services.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.post("/api/adoption", verifyToken, authorizeRoles("user"), createRequest);
router.get("/api/adoption", verifyToken, authorizeRoles("admin", "superadmin"), getRequests);
router.put("/api/adoption", verifyToken, authorizeRoles("admin", "superadmin"), updateRequests);

export default router;
