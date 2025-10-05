import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  year: Number,
  copies: { type: Number, default: 1 },
  availableCopies: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
