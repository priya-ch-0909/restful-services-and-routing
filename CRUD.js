const express = require('express');
const app = express();

app.use(express.json());

let authors = [
  { id: 1, name: "J.K. Rowling" },
  { id: 2, name: "J.R.R. Tolkien" },
  { id: 3, name: "Robert C. Martin" }
];

// ----------------------
// CREATE Author
// ----------------------
app.post('/authors', (req, res) => {
  const author = { id: authors.length + 1, ...req.body };
  authors.push(author);
  res.status(201).json(author);
});

// ----------------------
// READ all Authors
// ----------------------
app.get('/authors', (req, res) => {
  res.json(authors);
});

// ----------------------
// READ one Author by ID
// ----------------------
app.get('/authors/:id', (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  author ? res.json(author) : res.status(404).json({ error: "Author not found" });
});

// ----------------------
// UPDATE Author by ID
// ----------------------
app.put('/authors/:id', (req, res) => {
  const index = authors.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Author not found" });

  authors[index] = { ...authors[index], ...req.body };
  res.json(authors[index]);
});

// ----------------------
// DELETE Author by ID
// ----------------------
app.delete('/authors/:id', (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.status(204).end();
});

// ----------------------
// Start Server
// ----------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});