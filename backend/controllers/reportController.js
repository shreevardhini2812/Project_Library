import Borrow from "../models/Borrow.js";
import Payment from "../models/Payment.js";

export const getReports = async (req, res) => {
  try {
    const borrows = await Borrow.find().populate("user book");
    const payments = await Payment.find().populate("user");
    res.json({ borrows, payments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
