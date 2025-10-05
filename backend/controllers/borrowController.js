import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";
import Reservation from "../models/Reservation.js";

// User borrows a book
export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.availableCopies <= 0) return res.status(400).json({ message: "No copies available" });

    // Optional: enforce borrow limits per user here

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 1); // 7 days borrow period

    const borrow = await Borrow.create({
      user: req.user._id,
      book: book._id,
      borrowDate,
      returnDate: null,
      dueDate,
      status: "borrowed",
      fine: 0,

    });
    console.log("Creating borrow with dueDate:", dueDate);


    book.availableCopies -= 1;
    await book.save();

    // If user had a pending reservation for this book, mark it completed
    await Reservation.findOneAndUpdate({ book: book._id, user: req.user._id, status: "pending" }, { status: "completed" });

    res.status(201).json(borrow);
  } catch (err) {
    console.error("Borrow error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// User returns book
export const returnBook = async (req, res) => {
  try {
    const borrowId = req.params.id;

    // Find the borrow record
    const borrow = await Borrow.findById(borrowId).populate("book");
    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.status !== "borrowed")
      return res.status(400).json({ message: "Book already returned or invalid status" });

    // Update borrow status
    borrow.status = "returned";

    // Calculate fine if overdue
    const today = new Date();
    if (borrow.dueDate < today) {
      const diffDays = Math.ceil((today - borrow.dueDate) / (1000 * 60 * 60 * 24));
      borrow.fineAmount = diffDays * 10; // ₹10 per day, adjust as needed
    }

    await borrow.save();

    // Increment book available copies
    const book = await Book.findById(borrow.book._id);
    book.availableCopies += 1;
    await book.save();

    // Mark reservation as completed if exists
    await Reservation.findOneAndUpdate(
      { user: borrow.user, book: book._id, status: "pending" },
      { status: "completed" }
    );

    res.json({ message: "Book returned successfully", fine: borrow.fineAmount || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while returning book" });
  }
};

// Get user's borrow history
export const userHistory = async (req, res) => {
  try {
    const history = await Borrow.find({ user: req.user._id }).populate("book").sort({ borrowDate: -1 });
    res.json(history);
  } catch (err) {
    console.error("User history error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin - get all borrow history
export const allHistory = async (req, res) => {
  try {
    const history = await Borrow.find().populate("book user").sort({ borrowDate: -1 });
    res.json(history);
  } catch (err) {
    console.error("All history error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const scheduleOverdueNotification = async () => {
  const borrows = await Borrow.find({ status: "borrowed", dueDate: { $lt: new Date() } }).populate("user book");

  for (let b of borrows) {
    b.status = "overdue";
    const overdueDays = Math.ceil((new Date() - b.dueDate) / (1000*60*60*24));
    b.fineAmount = overdueDays * 10; // Example fine
    await b.save();

    // Send email reminder
    await sendemail({
      to: b.user.email,
      subject: "Overdue Book Reminder",
      text: `Your book "${b.book.title}" is overdue by ${overdueDays} day(s). Fine: ₹${b.fineAmount}`
    });
  }
};

export const getMyBorrowHistory = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user._id })
      .populate("book")
      .sort({ borrowDate: -1 });

    res.json(borrows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user._id })
      .populate("book", "title author");
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch borrow history" });
  }
};
// Mark fine as paid (dummy payment)
export const payFine = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) return res.status(404).json({ message: "Borrow not found" });

    borrow.finePaid = true; // add this field dynamically
    await borrow.save();

    res.json({ message: "Fine paid successfully", borrow });
  } catch (err) {
    res.status(500).json({ message: "Failed to pay fine" });
  }
};




