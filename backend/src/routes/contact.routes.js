import { Router } from "express";
import { createContact } from "../services/contacts.services";


const router = Router();

router.post('/api/contacts', createContact);
