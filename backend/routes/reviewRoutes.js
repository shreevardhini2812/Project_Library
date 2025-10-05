import express from "express";
import {
  submitReview,
  getMyReviews,
  getAllReviews,
  approveReview,
  deleteReview,
  getApprovedReviewsForBook
} from "../controllers/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { user, admin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/:bookId", authMiddleware, user, submitReview);
router.get("/my", authMiddleware, user, getMyReviews);
router.get("/", authMiddleware, admin, getAllReviews);
router.put("/:id/approve", authMiddleware, admin, approveReview);
router.delete("/:id", authMiddleware, admin, deleteReview);
router.get("/book/:bookId", getApprovedReviewsForBook);

export default router;
