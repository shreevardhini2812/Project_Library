import Borrow from "../models/Borrow.js";
import Payment from "../models/Payment.js";
export const payFine = async (req, res) => {

  try {
    const { borrowId, amount } = req.body;
    const userId = req.user?._id;
    if (!borrowId || !amount) {
      return res.status(400).json({ message: "borrowId and amount are required" });
    }

    const borrow = await Borrow.findOne({ _id: borrowId, user: userId }).populate("book");
    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.finePaid) return res.status(400).json({ message: "Fine already paid" });

    const transactionId = "TXN" + Math.floor(Math.random() * 10000000);

    borrow.finePaid = true;
    borrow.status = "returned";
    borrow.returnDate = new Date();
    await borrow.save();

    res.status(200).json({
      message: `Payment of ₹${amount} successful`,
      transactionId,
      borrow,
    });
  } catch (err) {
    console.error("Payment Error:", err);
    res.status(500).json({ message: "Payment failed" });
  }

};
