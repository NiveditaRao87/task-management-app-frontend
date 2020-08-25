import React, { useState, useEffect } from 'react'

const CardDetails = ({ card, onCardClose }) => {
    
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

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-GB', {year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric',minute: 'numeric', second: 'numeric'})
    }
    
    const [timer,setTimer] = useState({on: false, start: 0,timeSpent: 0}) //Stores the start time if the timer is on

    useEffect(() => {
        let interval
        if(timer.on){
            interval = setInterval(() => {
                // setTimer({ ...timer,timeSpent: Math.floor((Date.now() - timer.start)/1000) })
                setTimer({...timer,timeSpent: Date.now() - timer.start })
            }, 1000);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    },[timer])

    const onTimerClick = () => {
        if(timer.on){
            card.timeSpent.push({start: timer.start, stop: Date.now() }) 
            setTimer({on: false, start: 0,timeSpent: 0})
            return
        } 
        setTimer({ on: true, start: Date.now(), timeSpent: 0 })
    } 
    
    return <div>
        <h3>{card.title}</h3>
        <i className="fas fa-times" style={cancelStyle} onClick={onCardClose}></i>
        <p><strong>Description</strong> {card.description}</p>
        <p><strong>Due date</strong> {card.dueDate}</p>
        <i className="far fa-clock" style={clockStyle} onClick={onTimerClick}> {timer.on? 'Stop': 'Start'} timer</i>
        {timer.on && <p>{new Date(timer.timeSpent).toISOString().substr(11, 8)}</p>}
        {card.timeSpent && ([...card.timeSpent]
        .sort((a,b) => b.start-a.start))
        .map(timeSpent => <p key={timeSpent.start} >{formatDate(timeSpent.start)} - {formatDate(timeSpent.stop)}</p> )}
    </div>
}

export default CardDetails
