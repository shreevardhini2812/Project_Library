import { useEffect, useState } from "react";
import api from "../api";
import AdminNavbar from "../components/AdminNavbar";


export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    copies: 1,
  });

  
  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  
  const addBook = async () => {
    try {
      await api.post("/books", newBook);
      alert("Book added!");
      setNewBook({ title: "", author: "", genre: "", year: "", copies: 1 });
      fetchBooks();
    } catch (err) {
      alert("Failed to add book",err);
    }
  };

  
  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      alert("Failed to delete book",err);
    }
  };

  return (
    <div className="p-1">
      <AdminNavbar/>
      <h2 className="text-xl font-bold mb-4">Manage Books</h2>

      
      <div className="mb-6 border p-4 rounded bg-gray-100">
        <h3 className="font-semibold mb-2">Add New Book</h3>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          className="border p-2 mr-2"
        />
        
        <input
          type="number"
          placeholder="Copies"
          value={newBook.copies}
          min={1}
          onChange={(e) =>
            setNewBook({ ...newBook, copies: Number(e.target.value) })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={addBook}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400"
        >
          Add Book
        </button>
      </div>

     
      <h3 className="text-xl font-bold mb-4">Existing Books</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-sky-900 text-white">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Genre</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Copies</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td className="p-2 border">{b.title}</td>
              <td className="p-2 border">{b.author}</td>
              <td className="p-2 border">{b.genre}</td>
              <td className="p-2 border">{b.year}</td>
              <td className="p-2 border">{b.copies}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteBook(b._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-400">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
