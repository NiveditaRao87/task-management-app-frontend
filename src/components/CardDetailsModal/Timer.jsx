import React, { useState, useEffect, useContext } from 'react'
import { TimerContext } from '../../contexts/timer-context'
import cardService from '../../services/cards'
import storage from '../../utils/storage'

const Timer = ({ card, updateCard, updateList }) => {
  const [timer, setTimer] = useState('')
  const { timerOn, setTimerOn } = useContext(TimerContext)

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

  const stopOldTimer = (oldCard) => {
    oldCard = checkIfSameDay(oldCard)
    oldCard.tickingFrom = new Date(0)
    cardService
      .update(oldCard.id, oldCard)
  }

  const checkIfSameDay = (card) => {
    if(new Date(card.tickingFrom).getDate() !== new Date().getDate()){
      let nextStart = card.tickingFrom
      do {
        let nextStop = new Date(new Date(nextStart).setHours(24,0,0,0))
        card.timeSpent = [...card.timeSpent, {start: nextStart, stop: nextStop} ]
        nextStart = nextStop
      }while(new Date(nextStart).getDate() !== new Date().getDate())
      card.timeSpent = [...card.timeSpent, {start: nextStart, stop: new Date(Date.now())}]
    } else {
    card.timeSpent = [...card.timeSpent,{ start: card.tickingFrom, stop: new Date(Date.now()) }]
    }
    return card
  }

  const onTimerClick = () => {
    if(card.tickingFrom && new Date(card.tickingFrom).getFullYear() !== 1970){
      card = checkIfSameDay(card)
      card.tickingFrom = new Date(0)
      storage.removeTimer()
      setTimerOn(false)
      const { list, id, title, project } = card
      console.log(card)
      updateCard({ ...card,
        list: list.id,
        project: project && project.id
      })
      updateList({
        list: list.id,
        id,
        title,
        tickingFrom: card.tickingFrom
    })
    } else {
      if(timerOn){
        const oldTimer = storage.loadTimer()
        console.log(oldTimer)
        if(!window.confirm(`A timer is already running on task ${oldTimer.title}.\
Are you sure you want to stop that timer and start one on the task ${card.title}?`)){
           return
        } else {
          stopOldTimer(oldTimer)
        }
      }
      card.tickingFrom = new Date(Date.now())
      console.log(card)
      updateCard({ ...card,list: card.list.id, project: card.project && card.project.id })
      storage.saveTimer({...card, list: card.list.id, project: card.project && card.project.id})
      setTimerOn(true)
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
      <span 
      style={clockStyle}
      tabIndex='0'
      onClick={onTimerClick}
      onKeyDown={e => e.key === 'Enter' && onTimerClick()}>
        <span>{timer ? 'Stop': 'Start'} timer  </span>
        <i className="fas fa-stopwatch" style={clockStyle} >
        </i>
      {!timer && card.tickingFrom ? <span style={{marginLeft: "20px"}}>00:00:00</span> :  null }
      {timer && <span style={{marginLeft: "20px"}}>{new Date(timer).toISOString().substr(11, 8)}</span>}
      </span>
    </>
  )

}

export default Timer;