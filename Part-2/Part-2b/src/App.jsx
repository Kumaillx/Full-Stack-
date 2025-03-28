//Forms
//React Forms are the components 
// used to collect and manage the user inputs.
//user data , payments, handling authentications


//states are built in objects
import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
//form
  const addNote = (event) => {
    //prevents the page to reload as default settings
    event.preventDefault()
    console.log('button clicked', event.target )

  }


  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

        <form onSubmit={addNote}>
          <input type="Add node" />
          <button type='Submit'> save</button>
        </form>



    </div>
  )
}

export default App 