const express = require('express');
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", year: 2008 }
];

// GET /books?author=John&year=2008
app.get('/books', (req, res) => {
  const { author, year } = req.query;
  let filteredBooks = books;

  if (author) {
    filteredBooks = filteredBooks.filter(b => b.author.toLowerCase() === author.toLowerCase());
  }
  if (year) {
    filteredBooks = filteredBooks.filter(b => b.year == year);
  }

  res.json(filteredBooks);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});