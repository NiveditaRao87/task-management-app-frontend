import React, { useState, useEffect } from 'react'
import List from './components/List'
import AddArea from './components/AddArea'
import CardDetails from './components/CardDetails'
import Modal from './components/Modal'
import listService from './services/lists'
import cardService from './services/cards'
import './App.css'

const App = () => {
  
  const [lists, setLists] = useState('')
  // const [cards, setCards] = useState('')
  const [showCard, setShowCard] = useState(false)
  const [cardToShow, setCardToShow] = useState('')

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
    // setCardToShow(cards.find(card => card.id === id))
    const returnedCard = await cardService.getById(id)
    setCardToShow(returnedCard)
    
  }

  const handleCloseModal = () => {
    setShowCard(false)
    setCardToShow(null)
  }

  return (
    <div className='App'>
      <header className='App-header'>
      <h1>Task Manager</h1>
      </header>
      <main className='main'>
      {lists.length !== 0 && lists.map(list => 
      <List 
        key={list.id} 
        list={list} 
        cardsInList={list.cards}
        onAddCard={handleAddNewCard}
        onOpenCard={handleOpenCard}
      />)}
      <Modal show={showCard} onCloseModal={handleCloseModal}>
        <CardDetails card={cardToShow} onCardClose={() => setShowCard(false)} /> 
      </Modal>
      <AddArea  
        area='list'
        id={null} 
        addNewItem={handleAddNewList}
        />
      </main>
    </div>
  )
}

export default App
