import { Router } from "express";
import { createContact } from "../services/contacts.services.js";


const router = Router();

router.post('/api/contacts', createContact);

export default router;