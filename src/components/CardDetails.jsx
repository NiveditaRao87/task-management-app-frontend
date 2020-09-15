import React, { useState, useEffect } from 'react'

const CardDetails = ({ card, onCardClose }) => {
    
    const [timer,setTimer] = useState({on: false, start: 0,timeSpent: 0}) //Stores the start time if the timer is on
    
    useEffect(() => {
        let interval
        if(timer.on){
            interval = setInterval(() => {
                setTimer({...timer,timeSpent: Date.now() - timer.start })
            }, 1000);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    },[timer])
    
    const cancelStyle = {
        position: 'absolute',
        top: '10px',
        right: '15px',
        fontSize: '1.7rem',
        color: '#767c77',
    }

    const clockStyle = {
        fontSize: '2rem'
    }

    if(!card)
    return null

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-GB', {year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric',minute: 'numeric', second: 'numeric'})
    }
    
    const onTimerClick = () => {
        if(timer.on){
            card.timeSpent.push({start: timer.start, stop: Date.now() }) 
            setTimer({on: false, start: 0,timeSpent: 0})
            return
        } 
        setTimer({ on: true, start: Date.now(), timeSpent: 0 })
    } 
    
    return <div>
        <i 
          tabIndex='0'
          className="fas fa-times" 
          style={cancelStyle} 
          onClick={onCardClose} 
          onKeyDown={e => e.key === 'Enter' && onCardClose} />
        <h3 tabIndex='0'>{card.title}</h3>
        <p >in list <strong tabIndex='0'>{card.list.title}</strong></p>
        <p><strong>Description</strong> <span tabIndex='0'>{card.description}</span></p>
        <p><strong>Due date</strong> <span>{card.dueDate}</span></p>
        <i className="far fa-clock" style={clockStyle} onClick={onTimerClick}> {timer.on? 'Stop': 'Start'} timer</i>
        {timer.on && <p>{new Date(timer.timeSpent).toISOString().substr(11, 8)}</p>}
        {card.timeSpent && ([...card.timeSpent]
        .sort((a,b) => b.start-a.start))
        .map(timeSpent => <p key={timeSpent.start} >{formatDate(timeSpent.start)} - {formatDate(timeSpent.stop)}</p> )}
    </div>
}

export default CardDetails
