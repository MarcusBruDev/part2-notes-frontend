import Note from './components/Note'
import { useState , useEffect} from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Notificacion from './components/Notificacion'
import Footer from './components/Footer'
//comentario otro
const App = (props) => {

  
  const[notes,setNotesState]= useState(null);
  const[newNote,setNewNote]= useState('a new note...')
  const[showAll,setShowAll]= useState(true)
  const[errorMessage,setErrorMessage]=useState(null)

  


  const hook = ()=>{
      noteService
      .getAll()
      .then(initialNote=>{
        setNotesState(initialNote )
      })
      .catch(error=> console.log('Fail'))

  }
  

  useEffect(hook,[])
 

  const addNote = (event)=>{
    event.preventDefault();   
    
    const newObject = {
      content: newNote,
      important : Math.random()< 0.5,
    }

      noteService
      .create(newObject)
      .then(returnedNote=>{
        setNotesState(notes.concat(returnedNote))
        setNewNote('')
      })

   
  }

  const handleNoteChange = (event)=>{
    
    setNewNote(event.target.value)
  }

  const toggleImportance =(id)=>{
      
      //const url = `http://localhost:3001/notes/${id}`
      const  note = notes.find(n=> n.id === id)
      const changeNote = {...note,important: !note.important}

      noteService
      .update(id,changeNote)
      .then(returnedNote=>{
        setNotesState(notes.map(note=>note.id !== id ? note : returnedNote))
      })
      .catch(error=>{
        setErrorMessage(`${note.content} was already removed from server`)
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
        setNotesState(notes.filter(n=>n.id !== id))
      })
 

      

  }

  if(!notes){
    return
  }

  const notesToShow= showAll ? notes : notes.filter(note =>note.important)


  return (
    <div>
      <h1>Notes</h1>
      <Notificacion message={errorMessage}/>
      <div>
        <button onClick={()=>{setShowAll(!showAll)}}>Show {showAll ? 'Important' : 'All'}</button>
      </div>

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportance(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit' >Save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App