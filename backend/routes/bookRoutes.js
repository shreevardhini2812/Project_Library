import express from "express";
import { addBook, getBooks, deleteBook } from "../controllers/bookController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, admin, addBook);
router.get("/", getBooks);
router.delete("/:id", authMiddleware, admin, deleteBook);

export default router;
