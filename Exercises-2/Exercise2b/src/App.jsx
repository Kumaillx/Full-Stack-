import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace' }
  ]) 
  const [newName, setNewName] = useState('')

  // Handle form submission with duplicate check
  const addPerson = (event) => {
    event.preventDefault() // Prevent page refresh

    // Check if the name already exists in the persons array
    const nameExists = persons.some(person => person.name === newName)
    
    if (nameExists) {
      alert(`${newName} is already present in the phonebook!`)
      return // Stop the function, don't add the name
    }

    // If name doesn't exist, add it to the list
    const newPerson = { name: newName }
    setPersons([...persons, newPerson])
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