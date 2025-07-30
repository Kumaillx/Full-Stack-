const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());

// Create a write stream to log file (append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

// stream to log to both console and file
//seperate logger function
const logger = {
  write: (message) => {
    accessLogStream.write(message); // Write to file
    console.log(message.trim()); // Write to console
  }
};

// Configuration of morgan to use tiny format and custom logger
app.use(morgan('tiny', { stream: logger }));

let persons = [

  { "id": "1", "name": "Arto Hellas", "number": "040-123456" },
  { "id": "2", "name": "Ada Lovelace", "number": "39-44-5323523" },
  { "id": "3", "name": "Dan Abramov", "number": "12-43-234345" },
  { "id": "4", "name": "Mary Poppendieck", "number": "39-23-6423122" },
  { "id": "5", "name": "Ahmed Khan", "number": "0300-1234567" },
  { "id": "6", "name": "Fatima Ali", "number": "0333-7654321" },
  { "id": "7", "name": "Usman Tariq", "number": "0321-9876543" },
  { "id": "8", "name": "Aisha Saleem", "number": "0345-1122334" },
  { "id": "9", "name": "Kamran Hussain", "number": "0301-5566778" },
  {"id": "10","name": "Sana Aziz","number": "0312-9988776"},
  {
    "id": "11",
    "name": "Bilal Ahmed",
    "number": "0300-2345678"
  },
  {
    "id": "12",
    "name": "Zara Khan",
    "number": "0334-8765432"
  },
  {
    "id": "13",
    "name": "Imran Sheikh",
    "number": "0322-1098765"
  },
  {
    "id": "14",
    "name": "Hina Mehmood",
    "number": "0346-2233445"
  },
  {
    "id": "15",
    "name": "Javed Iqbal",
    "number": "0302-6677889"
  },
  {
    "id": "16",
    "name": "Rabia Anwar",
    "number": "0313-0011223"
  },
  {
    "id": "17",
    "name": "Faisal Nadeem",
    "number": "0300-3456789"
  },
  {
    "id": "18",
    "name": "Nida Farooq",
    "number": "0335-9876540"
  },
  {
    "id": "19",
    "name": "Tariq Mahmood",
    "number": "0323-2109876"
  },
  {
    "id": "20",
    "name": "Shaista Bibi",
    "number": "0347-3344556"
  }
];

// GET all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// GET single person by ID
// can also use qurey for more filtered approach
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  const person = persons.find(p => p.id === id);
  if (person) 
  {
    res.json(person);
  } 
  else {
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

// Delete a person
app.delete('/api/persons/:id', (req,res) => 
    {
        const id = req.params.id;
        persons = persons.filter(person => person.id !=id)
        response.status(204).end()

    })

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