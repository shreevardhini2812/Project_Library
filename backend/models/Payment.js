import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  borrow: { type: mongoose.Schema.Types.ObjectId, ref: "Borrow" },
  amount: Number,
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
