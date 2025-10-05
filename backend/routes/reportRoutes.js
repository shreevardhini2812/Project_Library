import express from "express";
import { getAllBorrows, getAllPayments, getAllUsers } from "../controllers/reportController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();
router.get("/borrows", protect, authorizeRoles("admin"), getAllBorrows);
router.get("/payments", protect, authorizeRoles("admin"), getAllPayments);
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
export default router;
