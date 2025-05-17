import { Router } from "express";
import { createRequest } from "../services/request.services";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post("/api/adoption/:id", verifyToken, createRequest);

export default router;
