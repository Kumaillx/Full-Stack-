//The newName state 
// is meant for controlling the form input element.
import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace' }
  ]) 
  const [newName, setNewName] = useState('Write name here...')

  // form submission
  const addPerson = (event) => {
    event.preventDefault() // Prevent page refresh
    const newPerson = { name: newName } // Create a new person object
    setPersons([persons, newPerson]) // Add the new person to the list
    setNewName('') // Clear the input field
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
      <div>
        name: 
          <input 
            value={newName} 
            onChange={(event) => setNewName(event.target.value)} 
          />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      
      </form>
      

      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>{person.name}</div>
      ))}
    </div>
  )
}

export default App