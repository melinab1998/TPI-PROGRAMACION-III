import { Router } from "express";
import {
	createRequest,
	getRequests,
	updateRequests,
	deleteRequest
} from "../services/request.services.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.post("/api/adoption", verifyToken, authorizeRoles("user"), createRequest);
router.get("/api/adoption", verifyToken, authorizeRoles("admin", "superadmin"), getRequests);
router.put("/api/adoption", verifyToken, authorizeRoles("admin", "superadmin"), updateRequests);
router.delete("/api/adoption/:id", verifyToken, authorizeRoles("superadmin"), deleteRequest);

export default router;
