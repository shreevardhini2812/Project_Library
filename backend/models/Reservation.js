import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notified: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "notified", "completed"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Reservation", reservationSchema);
