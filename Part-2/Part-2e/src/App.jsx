
import { useState } from 'react'
import Notes from './components/Notes'
import Footer from './components/Footer'

const initialNotes = [
  { id: 1, content: 'HTML is easy', important: true },
  { id: 2, content: 'Browser can execute only Javascript', important: false },
  { id: 3, content: 'GET and POST are the most important methods of HTTP protocol', important: true },
  { id: 4, content: 'POST is used to add data to a REST api', important: false },
  { id: 5, content: 'Network tab of devtools is most beneficial', important: true },
  { id: 6, content: 'This note is not saved to server', important: true },
]

function App() {
  const [notes, setNotes] = useState(initialNotes)
  const [showAll, setShowAll] = useState(true)
  const [newNote, setNewNote] = useState('')
  const [errorMessage, setErrorMessage] = useState('This Note is not saved to server\' was already removed from server')

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportance = id => {
    const note = notes.find(n => n.id === id)

    if (note.content === "This note is not saved to server") {
      setErrorMessage(`Note '${note.content}' was already removed from server`)
      setTimeout(() => setErrorMessage(null), 4000)
      return
    }

    const updatedNote = { ...note, important: !note.important }
    setNotes(notes.map(n => (n.id !== id ? n : updatedNote)))
  }

  const addNote = e => {
    e.preventDefault()
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() > 0.5
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>

      {errorMessage && <div className="error">{errorMessage}</div>}

      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'show important' : 'show all'}
      </button>

      <Notes notes={notesToShow} toggleImportance={toggleImportance} />

      <form onSubmit={addNote}>
        <input value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App
