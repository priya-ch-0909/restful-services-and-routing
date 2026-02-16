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
// GET Books with Pagination
// ----------------------
// Example: /books?page=1&limit=2
app.get('/books', (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedBooks = books.slice(startIndex, endIndex);

  res.json({
    page: Number(page),
    limit: Number(limit),
    total: books.length,
    data: paginatedBooks
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});