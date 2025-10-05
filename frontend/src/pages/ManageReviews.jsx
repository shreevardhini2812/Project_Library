import React, { useEffect, useState } from "react";
import api from "../api";
import AdminNavbar from "../components/AdminNavbar";

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/reviews");
        setReviews(data);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const approve = async (id) => {
    try {
      await api.put(`/reviews/${id}/approve`);
      setReviews(prev => prev.map(r => r._id === id ? { ...r, status: "approved" } : r));
    } catch (err) { alert("Approve failed",err); }
  };

  const del = async (id) => {
  try {
    await api.delete(`/reviews/${id}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
    setReviews(prev => prev.filter(r => r._id !== id));
  } catch (err) { 
    alert("Delete failed: " + (err.response?.data?.message || err.message)); 
  }
};


  return (
    <div>
      <AdminNavbar />
      <div className="p-2">
        <h2 className="text-2xl p-2">Manage Reviews</h2>
        <ul className="flex flex-col gap-5 w-70 p-2">
          {reviews.map(r => (
            <li key={r._id} className="bg-white p-2 flex flex-col justify-center">
              <p><strong>{r.book?.title}</strong> by {r.user?.name}</p>
              <p>{r.comment} ({r.rating}/5)</p>
              <p>Status: {r.status}</p>
              {r.status === "pending" && <button className="border p-1.5 bg-sky-900 text-white cursor-pointer hover:bg-gray-500" onClick={()=>approve(r._id)}>Approve</button>}
              <button className="border p-1.5 bg-sky-900 text-white cursor-pointer hover:bg-gray-500" onClick={()=>del(r._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
