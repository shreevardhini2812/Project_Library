import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import UserNavbar from "../components/UserNavbar";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const resBooks = await api.get("/books");
        const found = resBooks.data.find(x => x._id === id);
        setBook(found);
      } catch (err) { console.error(err); }
    };
    load();

    const loadReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reviews/book/${id}`);
        const data = await res.json();
        setReviews(data || []);
      } catch (err) { console.error(err); }
    };
    loadReviews();
  }, [id]);

  if (!book) return <div><UserNavbar /><div className="container">Loading...</div></div>;

  return (
    <div>
      <UserNavbar />
      <div className="relative left-120 top-20 w-100 p-5 bg-white justify-center items-center text-center text-l">
        <h2>Book: {book.title}</h2>
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>
        <p>Available: {book.availableCopies ?? book.copies}</p>

        <h3 className="underline">Reviews (approved)</h3>
        {reviews.length === 0 ? <p>No reviews yet</p> : reviews.map(r => (
          <div key={r._id} className="flex pl-25">
            <p><strong>{r.user?.name}</strong> - </p>
            <p>{r.comment} ({r.rating}/5)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
