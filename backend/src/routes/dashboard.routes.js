import express from "express";
import { getStats } from "../services/getStats.js";

const router = express.Router();

router.get("/api/stats", getStats); 

export default router;
