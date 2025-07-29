const express = require('express')
const app = express()

let notes = [
    {
        id: "1", // Changed to unique ID
        content: "Next is better than React",
        important: false
    },
    {
        id: "2", 
        content: "Ronaldo is better than messi", // Consider making content unique if needed
        important: false
    },
    {
        id: "3",
        content: "GET and POST are important methods for Express",
        important: true
    }
]

// Data is fetched what to render on the root page
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Looking at all notes (Json format)
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// Looking at a specific resourse from all notes (json format)
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
//   response.json(note)

    //If note is present in JSON response then send it to client
    if (note) { response.json(note) } 
    //if note is not present just give 404 not found 
    // error status to the client indicating the req doesnt exist
    else { response.status(404).end() }
})

// Deleting a particular id 
app.delete('/api/notes/:id', (request, response) => 
{
    const id = request.params.id
    const note = notes.filter(note => note.id !== id)
    response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})