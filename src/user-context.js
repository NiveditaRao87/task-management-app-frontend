//doesnt make much sense now as I have only one page to show upon logging in, when there is a navbar and more pages lets add it

import React, { useState, createContext } from 'react'
import storage from './utils/storage'

export const UserContext = createContext()

export const ContextWrapper = ({ children }) => {
  const defaultValueHandler = () => {
    const user = storage.loadUser()
    if (user) return true
    return false
  }

  const [isAuthenticated, setIsAuthenticated] = useState(defaultValueHandler())

  const user = {
    isAuthenticated,
    setIsAuthenticated
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}
