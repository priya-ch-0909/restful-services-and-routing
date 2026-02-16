const express = require('express');
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999 },
  { id: 5, title: "Design Patterns", author: "Erich Gamma", year: 1994 }
];

// ----------------------
// Search Books by Title
// ----------------------
// Example: /books/search?title=harry
app.get('/books/search', (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: "Title query required" });
  }

  const results = books.filter(b =>
    b.title.toLowerCase().includes(title.toLowerCase())
  );

  res.json(results);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});