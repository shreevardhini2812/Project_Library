import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getNotifications } from "../controllers/NotificationController.js";

const router = express.Router();

router.get("/", protect, getNotifications);

export default router;
