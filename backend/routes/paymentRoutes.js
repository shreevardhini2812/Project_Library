import express from "express";
import { payFine } from "../controllers/paymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {user} from "../middleware/roleMiddleware.js";
const router = express.Router();


router.post("/create", authMiddleware, user, payFine);


export default router;
