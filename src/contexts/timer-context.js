//doesnt make much sense now as I have only one page to show upon logging in, when there is a navbar and more pages lets add it

import React, { useState, createContext } from 'react'
import storage from '../utils/storage'

export const TimerContext = createContext()

export const TimerContextWrapper = ({ children }) => {
  const defaultValueHandler = () => {
    const timer = storage.loadTimer()
    if (timer) return true
    return false

  }

  const [timerOn, setTimerOn] = useState(defaultValueHandler())

  const timer = {
    timerOn,
    setTimerOn,
  }

  return (
    <TimerContext.Provider value={timer}>
      {children}
    </TimerContext.Provider>
  )
}
