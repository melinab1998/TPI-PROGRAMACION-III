import {Router} from "express";
import { createDonation } from "../services/donations.services.js";

const router = Router();

router.post("/donations", createDonation);

export default router;