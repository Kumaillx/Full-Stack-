const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('tiny')); // Log requests in tiny format

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

// GET all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// GET single person by ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// POST new person
app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' });
  }
  if (persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(400).json({ error: 'name must be unique' });
  }
  const person = {
    id: String(persons.length + 1),
    name: body.name,
    number: body.number
  };
  persons = [...persons, person];
  res.json(person);
});

// Info endpoint
app.get('/info', (req, res) => {
  const count = persons.length;
  const date = new Date();
  res.send(`Phonebook has info for ${count} people<br>${date}`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});