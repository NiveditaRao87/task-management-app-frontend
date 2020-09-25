import React, { useState, useContext } from 'react'
import Notification from '../../components/Notification'
import userService from '../../services/user'
import storage from '../../utils/storage'
import { UserContext } from '../../user-context'
import './Register.css'

const Register = ({ history }) => {

  const [password, setPassword] = useState('')
  const [retypedPassword, setRetypedPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState('')
  const { setIsAuthenticated } = useContext(UserContext)

  const handleSubmit = async event => {
    event.preventDefault()
    try{
      if(password !== retypedPassword){
        handleNotification('Retyped password does not match','error')
      } else {

        const userObject = {
          username: email,
          password,
          firstName,
          lastName
        }
        const user = await userService.register(userObject)
        storage.saveUser(user)
        setIsAuthenticated(true)
        setEmail('')
        setPassword('')
        setRetypedPassword('')
        setFirstName('')
        setLastName('')
        history.push('/')    }
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

  return (<div className='register-page'>
    <header>
      <h1>Task Management app</h1>
    </header>
    <main className='main-register'>
      <div className='register-content'>
        <h2>Register</h2>
        <Notification notification={notification} />
        <form className='register-form' onSubmit={handleSubmit}>
          <input
            className='form-input'
            autoFocus
            type='text'
            align='center'
            placeholder='First Name'
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            required
          />
          <input
            className='form-input'
            type='text'
            align='center'
            placeholder='Last Name'
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            required
          />
          <input
            className='form-input'
            type='email'
            align='center'
            placeholder='Email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
          <input
            className='form-input'
            type='password'
            align='center'
            placeholder='Password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
          <input
            className='form-input'
            type='password'
            align='center'
            placeholder='Confirm Password'
            value={retypedPassword}
            onChange={event => setRetypedPassword(event.target.value)}
            required
          />
          <button className='primary' type='submit'>Register</button>
          <button className='secondary' onClick={() => history.push('/login')}>Already have an account?</button>
        </form>
      </div>

    </main>
  </div>)
}

export default Register

//To dos make inputs reuseable
//Refactor css
//