import express from "express";
import { borrowBook, returnBook, userHistory, allHistory, getMyBorrowHistory, payFine } from "../controllers/borrowController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { user, admin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/:bookId", authMiddleware, user, borrowBook);
router.post("/return/:id", authMiddleware, user, returnBook);
router.get("/my", authMiddleware, user, userHistory);
router.get("/all", authMiddleware, admin, allHistory);
router.get("/my", authMiddleware, user, getMyBorrowHistory);
router.put("/:id/pay-fine", authMiddleware, payFine);

export default router;
