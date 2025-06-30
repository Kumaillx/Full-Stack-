import { useState } from 'react'

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
  const deletePerson = (index) => {
    const personToDelete = persons[index]
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      const updatedPersons = persons.filter((_, i) => i !== index)
      setPersons(updatedPersons)
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