//Child of the modal component. Remember to not add any handling onCardClose within this module and not send any
//parameters back so that there is consistency when the modal is closed by an outside click or esc key and using
// the cancel button from here.
//To dos Pull timer and other functionalities out of this component its getting too crowded here
//The new activity log should also be a new component.

import React, { useState, useEffect } from 'react'
import cardService from '../services/cards'
import Editable from './Editable'
import './CardDetails.css'

const ListsDropDown = ({ lists, currentList, onMove }) => {

  return (
    <>
      <label htmlFor='lists' className='sr-only'>Choose a list to move card to</label>
      <select id='lists-select' onChange={() => onMove(document.getElementById('lists-select').value)}>
        {/* <option disabled defaultValue>Move Card</option> */}
        <option value={currentList.id}>{currentList.title}</option>
        {lists.map(list => list.id !== currentList.id &&
        <option key={list.id} value={list.id} >{list.title}</option>)}
      </select>
    </>
  )
}

const CardDetails = ({ card, onCardClose, updateList, makeModalStatic, lists, removeFromList }) => {

  const [cardDetails, setCardDetails] = useState('')
  const [showLists, setShowLists] = useState('')

  const [timer,setTimer] = useState()

  useEffect(() => {

    let isCancelled = false

    cardService
      .getById(card)
      .then(response => {
        !isCancelled  && setCardDetails({ ...response, tickingFrom: new Date(response.tickingFrom) })
      })

    return () => {
      isCancelled = true
    }

  },[card])


  useEffect(() => {
    let interval
    if(cardDetails.tickingFrom){
      interval = setInterval(() => {
        setTimer(new Date(Date.now()) - cardDetails.tickingFrom)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  },[cardDetails.tickingFrom])

  const cancelStyle = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '1.7rem',
    color: '#767c77',
  }

  //   const clockStyle = {
  //     fontSize: '2rem'
  //   }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric',minute: 'numeric', second: 'numeric' })
  }

  const onTimerClick = () => {
    if(cardDetails.tickingFrom){
      const timeSpent = [...cardDetails.timeSpent,{ start: cardDetails.tickingFrom, stop: Date.now() }]
      const tickingFrom = null
      const { list, id, title } = cardDetails
      updateCard({ ...cardDetails,
        list: list.id,
        tickingFrom,
        timeSpent
      })
      updateList({
        list: list.id,
        id,
        title,
        tickingFrom
      })

    } else {
      const tickingFrom = Date.now()
      updateCard({ ...cardDetails,list: cardDetails.list.id, tickingFrom })
      const { list, id, title } = cardDetails
      updateList({
        list: list.id,
        id,
        title,
        tickingFrom
      })
    }
  }

  const handleMove = list => {
    //get card details props updatecard and update list
    const oldList = cardDetails.list.id
    updateCard({ ...cardDetails,list: list })
    const { id, title, tickingFrom } = cardDetails
    updateList({
      list,
      id,
      title,
      tickingFrom,
      oldList
    })
    setShowLists(false)
  }

  const updateCard = card => {
    cardService
      .update(card.id, card)
      .then(response => {
        console.log(response)
        setCardDetails(response)
        makeModalStatic(false)
      })
  }
  const updateCardTitle = newTitle => {
    updateCard({ ...cardDetails, list: cardDetails.list.id,title: newTitle })
    updateList({ list: cardDetails.list.id, id: cardDetails.id, title: newTitle })
  }

  const handleDelete = card => {
    cardService.remove(card.id)
    removeFromList(card)
    onCardClose()
  }

  if(!card)
    return null

  return (
    cardDetails ?
      <div>
        <i
          tabIndex='0'
          className="fas fa-times"
          style={cancelStyle}
          onClick={() => onCardClose()}
          onKeyDown={e => e.key === 'Enter' && onCardClose()} />
        <Editable
        //Card details from the get request have the list populated with details at the backend while sending card
        // for updation need to change it back to id. Also the lists state needs to be updated so the board gets updated with
        // the new title
          updateElement={newTitle => updateCardTitle(newTitle)}
          isEditing={makeModalStatic}
        >
          <h3 className='card-title' tabIndex='0'>{cardDetails.title}</h3>
        </Editable>
        <div >
          <span>in list </span>
          {!showLists ? <strong
            tabIndex='0'
            onClick={() => setShowLists(true)}
            onKeyDown={(e) => e.key === 'Enter' && setShowLists(true)}
          >
            {cardDetails.list.title}
          </strong>
            :
            <ListsDropDown lists={lists} currentList={cardDetails.list} onMove={handleMove} />
          }
        </div>
        <br/>
        <div>
          <strong>Description</strong>
          {!cardDetails.description
            ?
            <div>
              <Editable
                placeholder='Add a detailed description'
                updateElement={description => updateCard({ ...cardDetails, list: cardDetails.list.id, description })}
                isEditing={makeModalStatic}>
                <span>Add a detailed description</span>
              </Editable>
            </div>
            :
            <div tabIndex='0'>
              <Editable
                updateElement={description => updateCard({ ...cardDetails, list: cardDetails.list.id, description })}
                isEditing={makeModalStatic}>
                <span>{cardDetails.description}</span>
              </Editable>
            </div>}
        </div>
        {/* To be implemented later, due date with date picker and the timer */}
        {/* <div><strong>Due date</strong> <span>{cardDetails.dueDate}</span></div> */}
        <br/>
        {/* <i className="far fa-clock" style={clockStyle} onClick={onTimerClick}> {timer? 'Stop': 'Start'} timer</i> */}
        {/* Shows the ticking clock */}
        {/* {timer && <p>{new Date(timer).toISOString().substr(11, 8)}</p>} */}
        {/* {cardDetails.timeSpent && ([...cardDetails.timeSpent]
        .sort((a,b) => b.start-a.start))
        .map(timeSpent => <p key={timeSpent.start} >{formatDate(timeSpent.start)} - {formatDate(timeSpent.stop)}</p> )} */}
        <button className='primary delete-card' onClick={() => handleDelete(cardDetails)}>Delete card</button>
      </div>
      : null)
}

export default CardDetails
