import React, { useEffect, useState } from "react";
import api from "../api";
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/books");
        setBooks(data);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const borrow = async (bookId) => {
    try {
      await api.post(`/borrow/${bookId}`);
      alert("Borrowed");
      const { data } = await api.get("/books");
      setBooks(data);
    } catch (err) {
      alert(err.response?.data?.message || "Error borrowing");
    }
  };

  const reserve = async (bookId) => {
    try {
      await api.post("/reservations", { bookId });
      alert("Reserved");
    } catch (err) {
      alert(err.response?.data?.message || "Error reserving");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div>
        <h1 className="text-2xl p-2">Books</h1>
        <ul className="flex flex-row gap-2 pt-10 p-2">
          {books.map(b => (
            <li key={b._id} className="w-75 p-5 flex flex-col gap-3 bg-white text-l">
              <div>
                <strong>{b.title}</strong> — {b.author}<br/>
                <div>({b.availableCopies ?? b.copies} available)</div>
              </div>
              <div className="flex flex-row gap-5">
                <button className="bg-sky-900 p-2 w-20 cursor-pointer text-white hover:bg-gray-400 hover:text-black" onClick={()=>navigate(`/book/${b._id}`)}>View</button>
                { (b.availableCopies ?? b.copies) > 0 ? (
                  <button className="bg-sky-900 p-2 w-20 cursor-pointer text-white hover:bg-gray-400 hover:text-black" onClick={()=>borrow(b._id)}>Borrow</button>
                ) : (
                  <button className="bg-sky-900 p-2 w-20 cursor-pointer text-white hover:bg-gray-400 hover:text-black" onClick={()=>reserve(b._id)}>Reserve</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
