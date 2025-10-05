import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ["borrowed", "returned", "overdue"], default: "borrowed" },
  fineAmount: { type: Number, default: 0 },
  finePaid: { type: Boolean, default: false }
});
borrowSchema.virtual("fine").get(function () {
  const today = this.returnDate || new Date();
  if (this.dueDate && today > this.dueDate) {
    const daysOverdue = Math.ceil(
      (today - this.dueDate) / (1000 * 60 * 60 * 24)
    );
    return daysOverdue * 10;
  }
  return 0;
});

borrowSchema.set("toJSON", { virtuals: true });
borrowSchema.set("toObject", { virtuals: true });

export default mongoose.model("Borrow", borrowSchema);
