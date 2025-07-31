const express = require('express');
const morgan = require('morgan'); // Import morgan
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // Essential for parsing JSON request bodies

// logs directory exists
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) 
    {
fs.mkdirSync(logDir);
}

// Used to store detailed logs in an array this will involve res and req

const inMemoryDetailedLogs = []; 
//The max num of logs in the memory and log file are 50
const MAX_IN_MEMORY_DETAILED_LOGS = 50; 


const detailedLogFilePath = path.join(logDir, 'detailed_access.log'); // File for detailed logs


// Function to write detailed logs to file
const writeDetailedLogToFile = (logEntry) => 
{
    fs.appendFile(detailedLogFilePath, JSON.stringify(logEntry) + '\n', (err) => {
        if (err) 
        {
            console.error('Failed to write detailed log to file:', err);
        }
    });
};

// Custom Middleware the Logging after Response
app.use((req, res, next) => {
    
    if (req.originalUrl === '/detailed-logs')
    {
        return next();
    }

    const requestStartTime = Date.now();
    
    const requestDetails = {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        ip: req.ip || req.connection.remoteAddress,
        body: req.body, 
    };

    // Override res.end and res.write to capture response body
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

        // Restore original methods before sending response
        res.write = originalWrite;
        res.end = originalEnd;
        originalEnd.apply(res, args); 

        // NOW, AFTER THE RESPONSE IS SENT, CREATE AND STORE THE DETAILED LOG ENTRY
        const logEntry = {
            timestamp: new Date().toISOString(),
            request: requestDetails,
            response: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                headers: res.getHeaders(),
                body: responseBody, // The captured response body
                responseTimeMs: Date.now() - requestStartTime,
            },
        };

        // Store in-memory (for /detailed-logs endpoint)
        inMemoryDetailedLogs.push(logEntry);
        if (inMemoryDetailedLogs.length > MAX_IN_MEMORY_DETAILED_LOGS) {
            inMemoryDetailedLogs.shift(); // Remove the oldest log if exceeding limit
        }

        // Persist to file (asynchronously)
        writeDetailedLogToFile(logEntry);
    };

    next(); // Pass control to the next middleware or route handler
});


//  Setup for Morgan access logging
// Custom line-based rotating stream for Morgan
let morganFileIndex = 1;
let morganLineCount = 0;
const MAX_MORGAN_LINES = 50; // Rotate Morgan log file after 50 lines

let morganLogStream = fs.createWriteStream(path.join(logDir, `access.log${morganFileIndex}`), { flags: 'a' });

const morganCustomStream = {
    write: (message) => {
        // Write to current morgan log file
        morganLogStream.write(message);
        // Also print morgan logs to console (if desired, like your original code)
        console.log(`[Morgan] ${message.trim()}`);

        // Increment line count for morgan's log file rotation
        morganLineCount++;

        // Rotate file after MAX_MORGAN_LINES
        if (morganLineCount >= MAX_MORGAN_LINES) {
            morganLogStream.end(); // Close current stream
            morganFileIndex++; // Increment file index
            morganLineCount = 0; // Reset line count
            morganLogStream = fs.createWriteStream(path.join(logDir, `access.log${morganFileIndex}`), { flags: 'a' });
        }
    }
};

// Configure morgan to use tiny format and custom stream
// Place morgan after your express.json() and before your custom detailed logger
// This ensures morgan runs and logs the general request info.
// Note: Morgan logs AFTER the response is sent, similar to your detailed logger.
app.use(morgan('tiny', { stream: morganCustomStream }));

// --- END LOGGING SETUP ---

// Your existing in-memory data
let persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", "number": "39-44-5323523" },
    { id: "3", name: "Dan Abramov", "number": "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", "number": "39-23-6423122" },
    { id: "5", name: "Ahmed Khan", "number": "0300-1234567" },
    { id: "6", name: "Fatima Ali", "number": "0333-7654321" },
    { id: "7", name: "Usman Tariq", "number": "0321-9876543" },
    { id: "8", name: "Aisha Saleem", "number": "0345-1122334" },
    { id: "9", name: "Kamran Hussain", "number": "0301-5566778" },
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
    if (!body.name || !body.number) 
    {
        return res.status(400).json({ error: 'name or number missing' });
    }

    if (persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())) 
    {
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

// DELETE a person
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


// Info endpoint
app.get('/info', (req, res) => {
    const count = persons.length;
    const date = new Date();
    res.send(`Phonebook has info for ${count} people<br>${date}`);
});

// Endpoint to display in-memory DETAILED logs
app.get('/detailed-logs', (req, res) => {
    res.json(inMemoryDetailedLogs);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Morgan access logs will be saved to: ${path.join(logDir, 'access.logX')}`);
    console.log(`Detailed request/response logs will be saved to: ${detailedLogFilePath}`);
    console.log('Access in-memory detailed logs at /detailed-logs');
});