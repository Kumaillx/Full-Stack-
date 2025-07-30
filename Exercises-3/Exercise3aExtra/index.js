const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());

// Ensure logs directory exists
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Custom line-based rotating stream
let currentFileIndex = 1;
let lineCount = 0;
let logStream = fs.createWriteStream(path.join(logDir, `access.log${currentFileIndex}`), { flags: 'a' });

const customLogger = {
  write: (message) => {
    // Write to current log file
    logStream.write(message);
    // Write to console (for Exercise 3.7 compliance)
    console.log(message.trim());
    // Increment line count
    lineCount++;
    // Rotate file after 50 lines
    if (lineCount >= 50) {
      logStream.end(); // Close current stream
      currentFileIndex++; // Increment file index
      lineCount = 0; // Reset line count
      logStream = fs.createWriteStream(path.join(logDir, `access.log${currentFileIndex}`), { flags: 'a' });
    }
  }
};

// Configure morgan to use tiny format and custom logger
app.use(morgan('tiny', { stream: customLogger }));

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
{
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  },
  {
    "id": "5",
    "name": "Ahmed Khan",
    "number": "0300-1234567"
  },
  {
    "id": "6",
    "name": "Fatima Ali",
    "number": "0333-7654321"
  },
  {
    "id": "7",
    "name": "Usman Tariq",
    "number": "0321-9876543"
  },
  {
    "id": "8",
    "name": "Aisha Saleem",
    "number": "0345-1122334"
  },
  {
    "id": "9",
    "name": "Kamran Hussain",
    "number": "0301-5566778"
  },
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