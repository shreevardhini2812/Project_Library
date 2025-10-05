import Borrow from "../models/Borrow.js";

export const payFine = async (req, res) => {
  try {
    const { borrowId } = req.body;
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });
    if (borrow.fineAmount <= 0) return res.status(400).json({ message: "No fine to pay" });
    if (borrow.finePaid) return res.status(400).json({ message: "Fine already paid" });

    borrow.finePaid = true;
    await borrow.save();

    res.json({ message: "Fine paid successfully (dummy)", borrow });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
