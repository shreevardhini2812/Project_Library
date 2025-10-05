// backend/routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addBrowsingHistory, getBrowsingHistory } from "../controllers/userController.js";

const router = express.Router();
router.post("/history/add", protect, addBrowsingHistory);
router.get("/history", protect, getBrowsingHistory);
export default router;
