import Note from './components/Note'
import { useState , useEffect,useRef} from 'react'  //useRef es un hook que permite acceder a un elemento del DOM sin necesidad de volver a renderizar el componente
import axios from 'axios'
import noteService from './services/notes'
import Notificacion from './components/Notificacion'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
//comentario otro



const App = () => {
  
  const[notes,setNotesState]= useState(null);
  const[showAll,setShowAll]= useState(true)
  const[errorMessage,setErrorMessage]=useState(null)
  const[userName,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const [user,setUser]= useState(null)
  const [loginVisible,setLoginVisible]= useState(false)

  const noteFormRef = useRef() // Se crea una refeeremcia para poder acceder al componente NoteForm y poder ocultarlo cuando se crea una nueva nota.
  
  const hook = ()=>{
      noteService
      .getAll()
      .then(initialNote=>{
        setNotesState(initialNote )
      })
      .catch(error=> console.log('Fail',error))
  }

  useEffect(()=>{
      const loggedUserJSON= window.localStorage.getItem('loggedNoteAppUser')
      if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON)
       
        setUser(user)
        noteService.setToken(user.token)  
      }
  },[])
  

  useEffect(hook,[])




  /// es  un metodo que se encarga de manejar los dartos en el formulario de inicio de sesion
  const handleLogin = async (event)=>{
    event.preventDefault()


    try{
      const user = await loginService.login({
        userName,password,
      })
      window.localStorage.setItem('loggedNoteAppUser',JSON.stringify(user))
      
      noteService.setToken(user.token)  
      
     
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch(exeption){
      setErrorMessage('Wrong credentials')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)

    }
    

  }
 


  const handleLogout= async ()=>{
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
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



  // se llama funcion auxiliar para crear el formulario de inicio de sesion, se le pasa el evento onSubmit al formulario y se le pasa la funcion handleLogin, que es la que se encarga de manejar los datos del formulario
  const loginForm = ()=>{
        const hideWhenVisible = {display: loginVisible ? 'none' : ''}
        const showWhenVisible = {display: loginVisible ? '' : 'none'}

        return(
          <div>
            <div style={hideWhenVisible}>
              <h1>Notes</h1>
              <button onClick={()=>setLoginVisible(true)}>Log-in</button>
              <Footer></Footer>
            </div>


            <div style={showWhenVisible}>
             
              <h2>Log in to application</h2>
              
              <LoginForm 
                handleSubmit={handleLogin}
                handleUsernameChange={({target})=>setUsername(target.value)}
                handlePasswordChange={({target})=>setPassword(target.value)}
                userName={userName}
                password={password}
              />

              <button onClick={()=>setLoginVisible(false)}>Cancel</button>
              
            </div>
          </div>
        )



  }

  const addNote = (noteObject)=>{
      noteFormRef.current.toggleVisibility()
      noteService
      .create(noteObject)
      .then(returnedNote=>{
        setNotesState(notes.concat(returnedNote))

      }) 
  }

  const noteForm = ()=>(
    <Togglable buttonLabel="New Note" ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglable>
  )
  

  if(!notes){
    return
  }

  const notesToShow= showAll ? notes : notes.filter(note =>note.important)

 // {noteForm()}
  return(
    <div>
      
      <Notificacion message={errorMessage}/>

      {user === null ?
      loginForm():
      <div>
       
        <p id={user.name}>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
        <h1>Notes</h1>
        {noteForm()}
        

        <br/>
        <div>
          <button onClick={()=>{setShowAll(!showAll)}}>Show {showAll ? 'Important' : 'All'}</button>
        </div>

        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={()=>toggleImportance(note.id)} />
          )}
        </ul>
    

        <Footer/>
      </div>}
  </div>)
}
export default App