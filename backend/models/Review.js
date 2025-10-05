import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String,
  status: { type: String, enum: ["pending", "approved"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
