import Note from './components/Note'
import { useState , useEffect} from 'react'
import axios from 'axios'
//comentario otro
const App = (props) => {

  
  const[notes,setNotesState]= useState([]);
  const[newNote,setNewNote]= useState('a new note...')
  const[showAll,setShowAll]= useState(true)

  


  const hook = ()=>{
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response=>{
        console.log('promise fulfilled')
        setNotesState(response.data)
      })

  }
  console.log(`render ${notes.length} notes`)

  useEffect(hook,[])
 

  const addNote = (event)=>{
    event.preventDefault();
    
    const newObject = {
      content: newNote,
      important : Math.random()< 0.5,
      id: notes.length +1
    }

    setNotesState(notes.concat(newObject))
    setNewNote('')
  }

  const handleNoteChange = (event)=>{
    
    setNewNote(event.target.value)
  }

  const notesToShow= showAll ? notes : notes.filter(note =>note.important)


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=>{setShowAll(!showAll)}}>Show {showAll ? 'Important' : 'All'}</button>
      </div>

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit' >Save</button>
      </form>
    </div>
  )
}

export default App