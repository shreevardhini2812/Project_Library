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

// user submits
router.post("/:bookId", authMiddleware, user, submitReview);

// user views own
router.get("/my", authMiddleware, user, getMyReviews);

// admin views all
router.get("/", authMiddleware, admin, getAllReviews);

// admin approve
router.put("/:id/approve", authMiddleware, admin, approveReview);

// admin delete
router.delete("/:id", authMiddleware, admin, deleteReview);

// public - get approved reviews for a book
router.get("/book/:bookId", getApprovedReviewsForBook);

export default router;
