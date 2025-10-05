import { useEffect, useState } from "react";
import api from "../api";

export default function BorrowedBooks() {
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    const res = await api.get("/borrows/my");
    setBorrows(res.data);
  };

  const handlePayFine = async (borrowId) => {
    try {
      await api.post("/payments/pay-fine", { borrowId });
      alert("Fine paid successfully!");
      fetchBorrows();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to pay fine");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Borrowed Books</h2>
      {borrows.map((b) => (
        <div key={b._id} className="p-4 border mb-2">
          <p><strong>Book:</strong> {b.book?.title}</p>
          <p><strong>Status:</strong> {b.status}</p>
          <p><strong>Fine:</strong> ₹{b.fineAmount}</p>
          {b.fineAmount > 0 && !b.finePaid && (
            <button
              onClick={() => handlePayFine(b._id)}
              className="bg-red-600 text-white px-3 py-1 mt-2 rounded"
            >
              Pay Fine
            </button>
          )}
          {b.finePaid && <p className="text-green-600">Fine Paid</p>}
        </div>
      ))}
    </div>
  );
}
