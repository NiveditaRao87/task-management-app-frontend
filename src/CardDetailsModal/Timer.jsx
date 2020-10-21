import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { dateTimePattern, timePattern } from '../constants'

const Timer = ({ card, updateCard, updateList }) => {
  const [timer, setTimer] = useState('')
  useEffect(() => {
    let interval
    if(card.tickingFrom && new Date(card.tickingFrom).getFullYear() !== 1970){
      interval = setInterval(() => {
        setTimer(new Date(Date.now()) - new Date(card.tickingFrom))
      }, 1000)
    } else {
        clearInterval(interval)
        setTimer('')
    }
    return () => clearInterval(interval)
  },[card.tickingFrom])

  const clockStyle = {
    fontSize: '2rem',
    marginTop: '20px'
  }

  // const formatDate = (date) => {
  //   return new Date(date).toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric',minute: 'numeric' })
  // }

  const onTimerClick = () => {
    if(card.tickingFrom && new Date(card.tickingFrom).getFullYear() !== 1970){
      card.timeSpent = [...card.timeSpent,{ start: card.tickingFrom, stop: new Date(Date.now()) }]
      card.tickingFrom = new Date(0)
      const { list, id, title } = card
      updateCard({ ...card,
        list: list.id,
      })
      updateList({
        list: list.id,
        id,
        title,
        tickingFrom: card.tickingFrom
    })
    } else {
      card.tickingFrom = new Date(Date.now())
      updateCard({ ...card,list: card.list.id })
      const { list, id, title } = card
      updateList({
        list: list.id,
        id,
        title,
        tickingFrom: card.tickingFrom
      })
    }
  }

  return (
    <>
      <p 
      style={clockStyle}
      tabIndex='0'
      onClick={onTimerClick}
      onKeyDown={e => e.key === 'Enter' && onTimerClick()}>
        <span>{timer ? 'Stop': 'Start'} timer  </span>
        <i className="fas fa-stopwatch" style={clockStyle} >
      </i>
      </p>
      {timer && <p>{new Date(timer).toISOString().substr(11, 8)}</p>}
      {card.timeSpent && ([...card.timeSpent]
        .sort((a,b) => b.start-a.start))
        .map(timeSpent => 
        <p key={timeSpent.start} >
          {format(new Date(timeSpent.start), dateTimePattern)} - {format(new Date(timeSpent.stop), dateTimePattern)}
          {format(new Date(new Date(timeSpent.stop) - new Date(timeSpent.start)),timePattern)}
        </p> )}
    </>
  )

}

export default Timer;