
import User from "../models/User.js";
import Book from "../models/Book.js";

export const addBrowsingHistory = async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: "bookId required" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const user = await User.findById(req.user._id);
   
    user.browsingHistory = (user.browsingHistory || []).filter(e => e.book.toString() !== bookId);
    user.browsingHistory.unshift({ book: bookId, viewedAt: new Date() });
    if (user.browsingHistory.length > 50) user.browsingHistory = user.browsingHistory.slice(0, 50);
    await user.save();
    res.json({ message: "History updated" });
  } catch (err) {
    console.error("addBrowsingHistory", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBrowsingHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("browsingHistory.book", "title author genre");
    res.json(user.browsingHistory || []);
  } catch (err) {
    console.error("getBrowsingHistory", err);
    res.status(500).json({ message: "Server error" });
  }
};
