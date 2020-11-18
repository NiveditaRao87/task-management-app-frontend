//Child of the modal component. Remember to not add any handling onCardClose within this module and not send any
//parameters back so that there is consistency when the modal is closed by an outside click or esc key and using
// the cancel button from here.

//Urgent to do blocking deployment, clean up code for timer

import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns';
import cardService from '../../services/cards'
import Editable from '../Editable'
import Timer from './Timer'
import TabsArea from './TabsArea'
import './CardDetails.css'
import "react-datepicker/dist/react-datepicker.css";

const ListsDropDown = ({ lists, currentList, onMove, setShowLists }) => {

  return (
    <>
      <label htmlFor='lists-select' className='sr-only'>Choose a list to move card to</label>
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

const ProjectsDropDown = ({projects, card, onChange, setShowProjects}) => {
    
  return (
    <>
      <label htmlFor='projects-select' className='sr-only'>Choose a project </label>
      <select 
      id='projects-select' 
      defaultValue='default'
      autoFocus
      onChange={() => onChange(document.getElementById('projects-select').value)}
      onBlur={() => setShowProjects(false)}>
        {card.project ? <option value={card.project.id}>{card.project.title}</option>
        : <option value='default' disabled>Choose a project</option>}
        {projects.map(p => ((card.project && p.id !== card.project.id) || !card.project) &&
        <option key={p.id} value={p.id} >{p.title}</option>)}
        <option key='remove' value=''>Clear project field</option>
      </select>
    </>
  )
}

const CardHeader = ({ cardDetails, updateCard, updateList, makeModalStatic, lists }) => {

  const [showLists, setShowLists] = useState('')
  
  const updateCardTitle = newTitle => {
    updateCard({ ...cardDetails, list: cardDetails.list.id,title: newTitle, 
      project: cardDetails.project ? cardDetails.project.id : null })
    updateList({ list: cardDetails.list.id, id: cardDetails.id, title: newTitle })
  }

  const handleMove = list => {
    //get card details props updatecard and update list
    const oldList = cardDetails.list.id
    updateCard({ ...cardDetails,list: list, project: cardDetails.project ? cardDetails.project.id : null })
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
  
  return (
    <>
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
            <ListsDropDown 
            lists={lists}
            currentList={cardDetails.list} 
            onMove={handleMove} 
            setShowLists={setShowLists} />
          }
        </div>
        <br/>
    </>
  )
}

const CardDescription = ({ cardDetails, updateCard, makeModalStatic}) => (
  <div>
    <strong>Description</strong>
    {!cardDetails.description
      ?
      <div>
        <Editable
          placeholder='Add a detailed description'
          updateElement={description => updateCard({ 
            ...cardDetails, 
            list: cardDetails.list.id, 
            description, 
            project: cardDetails.project ? cardDetails.project.id : null })}
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
          updateElement={description => updateCard({ 
            ...cardDetails, 
            list: cardDetails.list.id, 
            description, 
            project: cardDetails.project ? cardDetails.project.id : null })}
          isEditing={makeModalStatic}>
          <span className="card-desc" tabIndex='0'>{cardDetails.description}</span>
        </Editable>
      </div>}
  </div>
)

const DueDate = ({ cardDetails, updateCard, makeModalStatic }) => {
  
  const [showDatePicker, setShowDatePicker] = useState(false)

  const spacingStyle = {
    marginTop: '20px',
    marginBottom: '20px'
  }

  const updateDueDate = date => {
    updateCard({
      ...cardDetails, 
      list: cardDetails.list.id, 
      dueDate: date,
      project: cardDetails.project ? cardDetails.project.id : null
    })
    setShowDatePicker(false)
  }

  const handleCalendarOpen = () => {
    console.log('calendar is open')
    makeModalStatic(true)

  }
  const handleCalendarClose = () => {
    console.log('calendar is closed')
    makeModalStatic(false)

  }
  
  return (<div style={spacingStyle}>
    <strong>Due Date  </strong>
    {cardDetails.dueDate 
      ? <DatePicker selected={new Date(cardDetails.dueDate)} 
          isClearable
          onCalendarClose={handleCalendarClose}
          onCalendarOpen={handleCalendarOpen}
          onChange={date => updateDueDate(date)}
          // onChange={date => updateCard({
          //   ...cardDetails, 
          //   list: cardDetails.list.id, 
          //   project: cardDetails.project ? cardDetails.project.id : null, 
          //   dueDate: date})}
          />
      : !showDatePicker && <span className="add-duedate" 
                            onClick={() => setShowDatePicker(true)}
                            onKeyDown={e => e.key === 'Enter' && setShowDatePicker(true)}>
                             Add a due date
                           </span>}
      {showDatePicker && 
        <DatePicker selected={addDays(new Date(),1)} 
        onChange={date => updateDueDate(date)}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen} 
        onBlur={() => setShowDatePicker(false)}
        />}
  </div>)
}

const CardProject = ({projects, cardDetails, updateCard}) => {
  const [showProjects, setShowProjects] = useState(false)

  const handleProjectChange = project => {
    updateCard({ ...cardDetails,list: cardDetails.list.id, project })
    setShowProjects(false)
  }

  return(<>
    <div >
      <strong>Project </strong>
      {(!showProjects && cardDetails.project) ? <span
        tabIndex='0'
        onClick={() => setShowProjects(true)}
        onKeyDown={(e) => e.key === 'Enter' && setShowProjects(true)}
      >
        {cardDetails.project && cardDetails.project.title}
      </span>
        :
        <ProjectsDropDown 
        projects={projects}
        card={cardDetails} 
        onChange={handleProjectChange} 
        setShowProjects={setShowProjects} />
      }
    </div>
  </>)
}

const CardDetails = ({ card, onCardClose, updateList, makeModalStatic, lists, projects, removeFromList }) => {

  const [cardDetails, setCardDetails] = useState('')

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

  const updateCard = card => {
    cardService
      .update(card.id, card)
      .then(response => {
        setCardDetails(response)
        makeModalStatic(false)
      })
  }

  const handleDelete = card => {
    if(window.confirm(`Are you sure, you want to delete this card? \
All related data such as time tracking will be deleted.`)){
      cardService.remove(card.id)
      removeFromList(card)
      onCardClose()
    }
  }

  if(!card)
    return null

  return (
    cardDetails ?
      <div className='card-modal'>
        <i
          tabIndex='0'
          className="fas fa-times btn-close-card"
          onClick={() => onCardClose()}
          onKeyDown={e => e.key === 'Enter' && onCardClose()} />
        <div>
          <CardHeader 
            cardDetails={cardDetails}
            updateCard={updateCard}
            updateList={updateList}
            makeModalStatic={makeModalStatic}
            lists={lists}
          />
          <CardDescription
            cardDetails={cardDetails}
            updateCard={updateCard}
            makeModalStatic={makeModalStatic}
          />
          <DueDate cardDetails={cardDetails} updateCard={updateCard} makeModalStatic={makeModalStatic} />
          <CardProject cardDetails={cardDetails} projects={projects} updateCard={updateCard} />
          <Timer card={cardDetails} updateCard={updateCard} updateList={updateList} />
          <TabsArea card={cardDetails} updateCard={updateCard} makeModalStatic={makeModalStatic} /> 
        </div>
        <button className='primary delete-card' onClick={() => handleDelete(cardDetails)}>Delete card</button>
      </div>
      : null)
}

export default CardDetails
