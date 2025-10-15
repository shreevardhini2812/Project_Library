import React, { useEffect, useState } from "react";
import api from "../api";
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
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

  useEffect(() => {
    let filtered = books.filter((b) => {
      const term = searchTerm.toLowerCase();
      return (
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term) ||
        b.genre?.toLowerCase().includes(term) ||
        b.isbn?.toLowerCase().includes(term)
      );
    });

    if (filter !== "all") {
      filtered = filtered.filter((b) => b.genre?.toLowerCase() === filter.toLowerCase());
    }

    setFilteredBooks(filtered);
  }, [searchTerm, filter, books]);

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

      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-4 text-sky-900">Books</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title, author, genre"
            className="border p-2 rounded w-full md:w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border p-2 rounded w-full md:w-1/4"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Genres</option>
            {[...new Set(books.map((b) => b.genre).filter(Boolean))].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((b) => (
              <li
                key={b._id}
                className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition"
              >
                <div>
                  <h2 className="font-bold text-lg text-sky-900">{b.title}</h2>
                  <p className="text-gray-700">
                    {b.author} • {b.genre}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ({b.availableCopies ?? b.copies} available)
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-sky-900 p-2 w-24 text-white rounded hover:bg-gray-500"
                    onClick={() => navigate(`/book/${b._id}`)}
                  >
                    View
                  </button>

                  {(b.availableCopies ?? b.copies) > 0 ? (
                    <button
                      className="bg-sky-900 p-2 w-24 text-white rounded hover:bg-gray-500"
                      onClick={() => borrow(b._id)}
                    >
                      Borrow
                    </button>
                  ) : (
                    <button
                      className="bg-sky-900 p-2 w-24 text-white rounded hover:bg-gray-500"
                      onClick={() => reserve(b._id)}
                    >
                      Reserve
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">No books found.</p>
          )}
        </ul>
      </div>



      
    </div>
  );
}
