import express from "express";
import { register, login, profile, updatePassword, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
router.put("/update-password", authMiddleware, updatePassword);
router.get("/me", authMiddleware, getMe);

export default router;
