import Reservation from "../models/Reservation.js";
import { sendEmail } from "../utils/sendEmail.js";
import Book from "../models/Book.js";


export const createReservation = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Check if user already reserved this book
    const existing = await Reservation.findOne({ user: req.user._id, book: bookId, status: "pending", });
    if (existing) return res.status(400).json({ message: "Already reserved" });

    const reservation = new Reservation({
      user: req.user._id,
      book: bookId,
      notified: book.availableCopies > 0, // notify immediately if available
      status: "pending",
    });

    await reservation.save();

    res.json({ message: "Book reserved successfully", reservation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const notifyReservation = async () => {
  try {
    // Find reservations not yet notified
    const reservations = await Reservation.find({ notified: false }).populate("user book");

    for (let r of reservations) {
      if (r.book.availableCopies > 0) {
        // Send email to user
        await sendEmail({
          to: r.user.email,
          subject: "Book Available",
          text: `The book "${r.book.title}" you reserved is now available. Please borrow it soon!`
        });

        // Mark reservation as notified
        r.notified = true;
        await r.save();
      }
    }
  } catch (err) {
    console.error("Error in reservation notification:", err);
  }
};

export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate("book")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};