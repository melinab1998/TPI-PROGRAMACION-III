import { Router } from "express";
import { createDonation } from "../services/donations.services.js";

const router = Router();

router.post("/api/donations", createDonation);

export default router;
