//Forms
//React Forms are the components 
// used to collect and manage the user inputs.
//user data , payments, handling authentications
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Notes'

const App = () => {
  const [notes, setNotes] = useState([])
  //controlled components
  const [newNote, setNewNote] = useState ('new note...')
  const [ShowAll, setShowAll] = useState (true)


  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])
  
  console.log('render', notes.length,'notes')
//const result = (5 > 3) ? "Yay" : "Boo";
//condition is (5 > 3). This asks, “Is 5 bigger than 3?”
// The answer is yes (true), because 5 is indeed bigger than 3.
// Since it’s true, the computer picks "Yay" (the val1 part).
// So, result gets filled with "Yay".
//const result = condition ? val1 : val2
  const notesToShow = ShowAll
  ? notes
  : notes.filter(note => note.important === true)

  //The event handler is called every 
  // time a change occurs in the input element.
  //Handling of note changing
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


// add note variable (parameters event)
// inside obj create
// 3 features 
// content newNote , imp randomly, id notes.length + 1


  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const noteObj={
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    setNotes(notes.concat(noteObj))
    setNewNote('')

    console.log(setNewNote)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=> setShowAll(!ShowAll)}>
        show {ShowAll ? 'Important': 'All'}
        </button>
      </div>
      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}


export default App