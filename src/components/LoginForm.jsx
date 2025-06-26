import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    userName,
    password
})=>(
    <form onSubmit={handleSubmit}>

      <div>
        Username
        <input 
       
        type='text'
        value={userName}
        name= "Username"
         /* lo que se le pasa a cada campo en Onchenhe se llama controladores de eventos, que nos ayuda a sincronizar los cambios en el campo con el esrtado del componente de la app, a los controladored de evento se le apasan cin onjeto como parametro y se desestruyctutan en canpo target del objeto */ 

         //({target})=>setUsername(target.value)
        onChange={handleUsernameChange}
        />
      </div>
      
      <div>
        Password
        <input 
        type='password'
        value={password}
        name= "Password"
        //({target})=>setPassword(target.value)
        onChange={handlePasswordChange}
        />
      </div>

      <button type='submit'>Login</button>
    </form>
  )

LoginForm.ropTypes={
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}


export default LoginForm  