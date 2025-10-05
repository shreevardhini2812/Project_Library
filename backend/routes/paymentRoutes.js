import express from "express";
import { payFine } from "../controllers/paymentController.js";
import { authMiddleware, user } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/pay-fine", authMiddleware, user, payFine);

export default router;
