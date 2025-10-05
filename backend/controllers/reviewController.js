import Review from "../models/Review.js";
import Book from "../models/Book.js";


export const submitReview = async (req, res) => {
  try {
    const { rating = 5, comment } = req.body;
    const { bookId } = req.params;
    if (!comment) return res.status(400).json({ message: "Comment required" });
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = await Review.create({
      user: req.user._id,
      book: bookId,
      rating,
      comment,
      status: "pending"
    });

    res.status(201).json({ message: "Review submitted", review });
  } catch (err) {
    console.error("Submit review error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id }).populate("book", "title author");
    res.json(reviews);
  } catch (err) {
    console.error("Get my reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("book user").sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Get all reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    review.status = "approved";
    await review.save();
    res.json({ message: "Review approved", review });
  } catch (err) {
    console.error("Approve review error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getApprovedReviewsForBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId, status: "approved" }).populate("user", "name");
    res.json(reviews);
  } catch (err) {
    console.error("Get approved reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
