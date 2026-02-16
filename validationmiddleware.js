const express = require('express');
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", year: 2008 }
];

// ----------------------
// Middleware: Validate Year
// ----------------------
function validateYear(req, res, next) {
  const { year } = req.query;
  if (year) {
    const numYear = parseInt(year, 10);
    if (isNaN(numYear) || numYear < 1000 || numYear > new Date().getFullYear()) {
      return res.status(400).json({ error: "Invalid year parameter" });
    }
  }
  next();
}

// ----------------------
// GET Books with Validation
// ----------------------
app.get('/books', validateYear, (req, res) => {
  const { year } = req.query;
  let filteredBooks = books;

  if (year) {
    filteredBooks = filteredBooks.filter(b => b.year == year);
  }

  res.json(filteredBooks);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});