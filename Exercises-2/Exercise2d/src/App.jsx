import { useState } from 'react'
import axios from 'axios';
// Filter Component
const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)} />
    </div>
  )
}

// PersonForm Component
const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addPerson }) => {
  return (
    <div>
      <form>
        
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      
      </form>
    </div>
  )
}

// Persons Component
const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(index)}>delete</button>
        </div>
      ))}
    </div>
  )
}

// Main App Component
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  //Used for HTTP Axios request
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError] = useState(null)


  // Handle adding a new person
  const addPerson = (event) => {
    event.preventDefault()

    // Check for duplicate name
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (nameExists) {
      alert(`${newName} is already present in the phonebook!`)
      return
    }

    // Add the new person
    const newPerson = { name: newName, number: newNumber }
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  // Handle deleting a person
  const deletePerson = async (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (!personToDelete) return

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      setIsLoading(true)
      setError(null)
      try {
        await axios.delete(`http://localhost:3001/persons/${id}`)
        setPersons(persons.filter(person => person.id !== id))
      } catch (err) {
        setError('Failed to delete person. Please try again.')
        console.error('Delete error:', err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Filter the persons list based on the filter input
  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App