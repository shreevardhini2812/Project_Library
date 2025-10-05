import React, { useEffect, useState } from "react";
import api from "../api";
import UserNavbar from "../components/UserNavbar";

export default function MyReviews() {
  const [books, setBooks] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [bookId, setBookId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const b = await api.get("/books"); setBooks(b.data);
        const r = await api.get("/reviews/my"); setMyReviews(r.data);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!bookId || !comment) { alert("fill fields"); return; }

    try {
      const { data } = await api.post(`/reviews/${bookId}`, { rating, comment });
      const reviewObj = data.review || data;
      setMyReviews(prev => [...prev, reviewObj]);
      setComment(""); setBookId(""); setRating(5);
      alert("Submitted (pending approval)");
    } catch (err) {
      alert(err.response?.data?.message || "Submit failed");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="p-3">
        <h2 className="text-xl p-3">Submit Review</h2>
        <form onSubmit={submit} className="flex flex-col gap-2 w-100 p-2 ">
          <select value={bookId} onChange={e=>setBookId(e.target.value)}>
            <option value="">Select Book</option>
            {books.map(b => <option key={b._id} value={b._id}>{b.title}</option>)}
          </select>
          <input className="p-1 border" type="number" min="1" max="5" value={rating} onChange={e=>setRating(e.target.value)} />
          <textarea className="border p-1" value={comment} onChange={e=>setComment(e.target.value)} placeholder="Comments" />
          <button className="bg-sky-900 p-2 w-20 cursor-pointer text-white hover:bg-gray-400 hover:text-black" type="submit">Submit</button>
        </form>

        <h3 className="text-xl p-3">Your Reviews</h3>
        <ul>
          {myReviews.map(r => (
            <li key={r._id} className="p-3 bg-white w-100">
              <p><strong>{r.book?.title}</strong> — {r.rating}/5</p>
              <p>{r.comment}</p>
              <p>Status: {r.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
