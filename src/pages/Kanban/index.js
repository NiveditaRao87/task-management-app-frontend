import React, { useState, useEffect, useContext } from 'react'
import List from '../../components/List'
import AddArea from '../../components/AddArea'
import CardDetails from '../../components/CardDetails'
import Modal from '../../components/Modal'
import listService from '../../services/lists'
import cardService from '../../services/cards'
import storage from '../../utils/storage'
import './Kanban.css'
import { UserContext } from '../../user-context'

const Kanban = () => {
  
  const [lists, setLists] = useState('')
  const [showCard, setShowCard] = useState(false)
  const [cardToShow, setCardToShow] = useState('')
  const { setIsAuthenticated } = useContext(UserContext)

  useEffect(() =>{
    
    listService
      .getAll()
      .then(initialLists => {
        setLists(initialLists)
      })
      
  },[])

  const handleAddNewList = (title,...ignore) => {
      const listObject = { title }
      
      listService
      .create(listObject)
      .then(returnedList => {
        setLists(lists.concat(returnedList))
      })
  }
  const handleAddNewCard = (title,list) => {
      const cardObject = {
        title,
        list
      }
      cardService
        .create(cardObject)
        .then(returnedCard => {
          setLists(lists.map(l => l.id !== list ? l : {...l,cards: l.cards.concat({ 
            title: returnedCard.title,
            dueDate: returnedCard.dueDate,
            currentTask: returnedCard.currentTask,
            id: returnedCard.id
          }) 
        }))
        })
  }

  const handleOpenCard = async (id) => {  
    setShowCard(true)
    //Should move this down to card details. 
    // To be done after router is in place and backend and frontend or in sync again
    const returnedCard = await cardService.getById(id)
    setCardToShow(returnedCard)
    
  }

  const handleCloseModal = () => {
    setShowCard(false)
    setCardToShow(null)
  }
  const handleUpdateTitle = (updatedList) => {
    setLists(lists.map(list => list.id !== updatedList.id ? list : updatedList))
  }

  const handleLogout = () => {
    storage.logoutUser()
    setIsAuthenticated(false)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Task Manager
        <button className='primary logout' onClick={handleLogout}>
          Logout
        </button>
        </h1>
      </header>
      <main className='main'>
      {lists.length !== 0 && lists.map(list => 
      <List 
        key={list.id} 
        list={list} 
        cardsInList={list.cards}
        onAddCard={handleAddNewCard}
        onOpenCard={handleOpenCard}
        updateTitle={handleUpdateTitle}
      />)}
      {showCard && <Modal onCloseModal={handleCloseModal}>
        <CardDetails 
          tabIndex='99'
          card={cardToShow} 
          onCardClose={handleCloseModal}
        /> 
      </Modal>}
      <AddArea  
        area='list'
        id={null} 
        addNewItem={handleAddNewList}
        />
      </main>
      <footer className='board-footer'>
        <p className='attribution'>Photo by <a href='https://www.instagram.com/vikranthupili/'>Vikranth Thupili</a></p>
      </footer>
    </div>
  )
}

export default Kanban
