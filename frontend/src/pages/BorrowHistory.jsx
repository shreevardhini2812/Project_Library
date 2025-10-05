import React, { useEffect, useState } from "react";
import api from "../api.js";
import UserNavbar from "../components/UserNavbar.jsx";

export default function BorrowHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/borrow/my");
        setHistory(data);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const handleReturn =  async (borrowId) => {
    try {
      const { data } =  await api.post(`/borrow/return/${borrowId}`);
      alert(data.fine > 0 ? `Returned - fine ₹${data.fine}` : "Returned");
      setHistory(prev => prev.map(h => h._id === borrowId ? data : h));
    } catch (err) {
      alert(err.response?.data?.message || "Return failed");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div>
        <h2 className="text-xl p-2 relative left-145 w-60">Your Borrow History</h2>
        <ul className="flex flex-col gap-5 w-100 relative left-120 p-2">
          {history.map(h => (
            <li key={h._id} className="p-2 bg-white flex flex-col gap-2">
              <p><strong>{h.book?.title}</strong></p>
              <p>Borrowed: {new Date(h.borrowDate || h.createdAt).toLocaleString()}</p>
              <p>Due: {h.dueDate ? new Date(h.dueDate).toLocaleDateString() : "—"}</p>
              <p>Status: {h.status}</p>
              {h.status === "borrowed" && <button onClick={()=>handleReturn(h._id)} className="bg-sky-900 p-2 w-20 cursor-pointer text-white hover:bg-gray-400 hover:text-black">Return</button>}
              {h.fine > 0 && <p>Fine: ₹{h.fine}</p>}
              {h.fine > 0 && !h.finePaid && (
  <button
    onClick={async () => {
      try {
        await api.put(`/borrows/${h._id}/pay-fine`);
        alert("Fine paid successfully");
        setHistory(); // refresh list
      } catch (err) {
        alert("Payment failed",err);
      }
    }}
  >
    Pay Fine ₹{h.fine}
  </button>
)}
{h.fine > 0 && h.finePaid && <p style={{ color: "green" }}>Fine Paid</p>}

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
