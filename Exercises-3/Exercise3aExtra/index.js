const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Log directory setup
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// In-memory log array
const inMemoryDetailedLogs = [];
const MAX_IN_MEMORY_DETAILED_LOGS = 50;

const detailedLogFilePath = path.join(logDir, 'detailed_access.log');

// Log writing function
const writeDetailedLogToFile = (logEntry) => {
    fs.appendFile(detailedLogFilePath, JSON.stringify(logEntry) + '\n', (err) => {
        if (err) {
            console.error('Failed to write detailed log to file:', err);
        }
    });
};

// Middleware for detailed logging using UUID
app.use((req, res, next) => {
    if (req.originalUrl === '/detailed-logs') {
        return next();
    }

    const requestStartTime = Date.now();
    const requestUUID = uuidv4();

    const requestDetails = {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        ip: req.ip || req.connection.remoteAddress,
        body: req.body,
        _internalId: requestUUID,
    };

    const originalEnd = res.end;
    const originalWrite = res.write;
    const chunks = [];

    res.write = (...args) => {
        if (args[0]) {
            chunks.push(Buffer.from(args[0]));
        }
        originalWrite.apply(res, args);
    };

    res.end = (...args) => {
        if (args[0]) {
            chunks.push(Buffer.from(args[0]));
        }

        const responseBody = Buffer.concat(chunks).toString('utf8');

        res.write = originalWrite;
        res.end = originalEnd;
        originalEnd.apply(res, args);

        const logEntry = {
            timestamp: new Date().toISOString(),
            request: { ...requestDetails },
            response: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                headers: res.getHeaders(),
                body: responseBody,
                responseTimeMs: Date.now() - requestStartTime,
            },
        };

        // 🐞 Debug UUID to terminal only
        console.log(`[DEBUG] Request UUID: ${requestUUID} for ${req.method} ${req.originalUrl}`);

        // ❌ Remove UUID before logging
        delete logEntry.request._internalId;

        inMemoryDetailedLogs.push(logEntry);
        if (inMemoryDetailedLogs.length > MAX_IN_MEMORY_DETAILED_LOGS) {
            inMemoryDetailedLogs.shift();
        }

        writeDetailedLogToFile(logEntry);
    };

    next();
});

// Morgan setup with file rotation
let morganFileIndex = 1;
let morganLineCount = 0;
const MAX_MORGAN_LINES = 50;
let morganLogStream = fs.createWriteStream(path.join(logDir, `access.log${morganFileIndex}`), { flags: 'a' });

const morganCustomStream = {
    write: (message) => {
        morganLogStream.write(message);
        console.log(`[Morgan] ${message.trim()}`);
        morganLineCount++;

        if (morganLineCount >= MAX_MORGAN_LINES) {
            morganLogStream.end();
            morganFileIndex++;
            morganLineCount = 0;
            morganLogStream = fs.createWriteStream(path.join(logDir, `access.log${morganFileIndex}`), { flags: 'a' });
        }
    }
};

app.use(morgan('tiny', { stream: morganCustomStream }));

// Demo Phonebook API
let persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
    { id: "5", name: "Ahmed Khan", number: "0300-1234567" },
    { id: "6", name: "Fatima Ali", number: "0333-7654321" },
    { id: "7", name: "Usman Tariq", number: "0321-9876543" },
    { id: "8", name: "Aisha Saleem", number: "0345-1122334" },
    { id: "9", name: "Kamran Hussain", number: "0301-5566778" },
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(p => p.id === req.params.id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number missing' });
    }

    if (persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const newId = String(Math.max(...persons.map(p => parseInt(p.id))) + 1);
    const person = {
        id: newId,
        name: body.name,
        number: body.number
    };

    persons = [...persons, person];
    res.status(201).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const idToDelete = req.params.id;
    const initialLength = persons.length;
    persons = persons.filter(p => p.id !== idToDelete);

    if (persons.length < initialLength) {
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'person not found' });
    }
});

app.get('/info', (req, res) => {
    const count = persons.length;
    const date = new Date();
    res.send(`Phonebook has info for ${count} people<br>${date}`);
});

// View in-memory logs
app.get('/detailed-logs', (req, res) => {
    res.json(inMemoryDetailedLogs);
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Morgan logs saved in: ${path.join(logDir, 'access.logX')}`);
    console.log(`Detailed logs saved in: ${detailedLogFilePath}`);
    console.log(`Access detailed logs at http://localhost:${PORT}/detailed-logs`);
});
