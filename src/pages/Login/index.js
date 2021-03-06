import React, { useContext, useState } from 'react'
import Notification from '../../components/Notification'
import loginService from '../../services/login'
import { UserContext } from '../../contexts/user-context'
import storage from '../../utils/storage'
import './Login.css'

//To dos convert the input component to a reuseable one
// Fix auto scroll
// Fix accessibility

const Login = ({ history }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const { setIsAuthenticated } = useContext(UserContext)

  const handleSubmit = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      storage.saveUser(user)
      setIsAuthenticated(true)
    }catch(err){
      handleNotification('Invalid username or password', 'error')
    }
  }

  const handleNotification = (message, type) => {
    setNotification({
      message, type
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div className='login-page'>
      <header>
        <h1>µTasker</h1>
      </header>
      <main className='main-login'>
        <div className='login-img-wrapper'>
          <img className='login-img'
            // eslint-disable-next-line no-undef
            src={require('../../images/andrew-neel-ute2XAFQU2I-unsplash.jpg')} alt=''/>
        </div>
        <div className='login-content'>
          <h2>Login</h2>
          <Notification notification={notification} />
          <form className='login-form' onSubmit={handleSubmit}>
            <input
              className='login-input'
              autoFocus
              type='text'
              align='center'
              placeholder='Username'
              required
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
            <input
              className='login-input'
              type='password'
              align='center'
              required
              placeholder='Password'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <button className='primary' type='submit'>Sign in</button>
            <button className='secondary' onClick={() => history.push('/register')}>Register</button>
          </form>
        </div>

      </main>
      <footer>
        <p className='attribution login-img-attr'>
          <span>Photo by </span>
          <a href='https://unsplash.com/@andrewtneel' target='_blank' rel='noopener noreferrer'>Andrew Neel</a>
          <span> on </span>
          <a href='https://unsplash.com/' target='_blank' rel='noopener noreferrer'>unsplash</a>
        </p>
      </footer>
    </div>
  )
}

export default Login