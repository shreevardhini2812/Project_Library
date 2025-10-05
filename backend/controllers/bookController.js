import Book from "../models/Book.js";


export const addBook = async (req, res) => {
  try {
    const { title, author, genre, year, copies = 1 } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Missing title or author" });

    const book = await Book.create({
      title,
      author,
      genre,
      year,
      copies,
      availableCopies: copies
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Add book error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };
    if (genre) query.genre = { $regex: genre, $options: "i" };

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error("Get books error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
