
const Notes = ({ notes, toggleImportance }) => {
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          {note.content}
          <button onClick={() => toggleImportance(note.id)}>
            make {note.important ? 'not important' : 'important'}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Notes
