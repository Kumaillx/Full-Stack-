<<<<<<< HEAD
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

=======
//states are built in objects
import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
>>>>>>> 3970ab815dd34d1fbba0b284a12cd0f489ac544f

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
<<<<<<< HEAD

        <form onSubmit={addNote}>
          <input type="Add node" />
          <button type='Submit'> save</button>
        </form>



=======
>>>>>>> 3970ab815dd34d1fbba0b284a12cd0f489ac544f
    </div>
  )
}

export default App 