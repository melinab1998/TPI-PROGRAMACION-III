import { Router } from "express";

const router = Router();

router.get('', (req, res) => {
        res.send("buenas")
});

export default router;