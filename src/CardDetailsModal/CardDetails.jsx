//Child of the modal component. Remember to not add any handling onCardClose within this module and not send any
//parameters back so that there is consistency when the modal is closed by an outside click or esc key and using
// the cancel button from here.
//To dos Pull timer and other functionalities out of this component its getting too crowded here
// commented out any traces of timer from here and building a separate component to handle it
//Change activity log in backend to notes and learnings component.
//Time tab should show total time spent now and a graph later

//Urgent to do blocking deployment, clean up code for timer

import React, { useState, useEffect } from 'react'
import cardService from '../services/cards'
import Editable from '../components/Editable'
import Timer from './Timer'
import './CardDetails.css'

const ListsDropDown = ({ lists, currentList, onMove, setShowLists }) => {

  return (
    <>
      <label htmlFor='lists' className='sr-only'>Choose a list to move card to</label>
      <select 
      id='lists-select' 
      autoFocus
      onChange={() => onMove(document.getElementById('lists-select').value)}
      onBlur={() => setShowLists(false)}>
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

//Change useEffect to fetch only on first render then update state and don't fetch again if details already present.

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

  const cancelStyle = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '1.7rem',
    color: '#767c77',
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
            <ListsDropDown lists={lists} currentList={cardDetails.list} onMove={handleMove} setShowLists={setShowLists} />
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
                <span 
                className="card-desc"
                tabIndex='0'
                >Add a detailed description</span>
              </Editable>
            </div>
            :
            <div>
              <Editable
                updateElement={description => updateCard({ ...cardDetails, list: cardDetails.list.id, description })}
                isEditing={makeModalStatic}>
                <span className="card-desc"  tabIndex='0'>{cardDetails.description}</span>
              </Editable>
            </div>}
        </div>
        <Timer card={cardDetails} updateCard={updateCard} updateList={updateList} />
        <button className='primary delete-card' onClick={() => handleDelete(cardDetails)}>Delete card</button>
      </div>
      : null)
}

export default CardDetails
