import express from "express";
import { createReservation, notifyReservation } from "../controllers/reservationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { user } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, user, createReservation);
router.post("/", authMiddleware, user, notifyReservation);

// no admin routes here in minimal implementation
export default router;
