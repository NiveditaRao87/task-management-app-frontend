import React, { useState } from 'react'
import './App.css'
import List from './components/List'
import AddArea from './components/AddArea'
import CardDetails from './components/CardDetails'
import Modal from './components/Modal'

const App = () => {
  
  const preloadedLists = [
    {
      title: "To do",
      id: 0
    },
    {
      title: "WIP",
      id: 1
    },
    {
      title: 'Parked',
      id: 2
    }
  ]

  const preloadedCards = [
    {
      title: 'React official documentation',
      description: 'Start this task after full stack open course is complete',
      listId: 0,
      timeSpent: [],
      id: 0
    },
    {
      title: 'Javascript perusteet',
      description: 'Do this course to learn some basic finnish terms related to IT',
      dueDate: new Date('September 30, 2020 23:00').toLocaleString('en-GB', {year: 'numeric', month: 'short', day: 'numeric'}),
      timeSpent: [],
      listId: 0,
      id: 1
    },
    {
      title: 'Full stack open course',
      description: 'Currently doing part 5 of this course, complete till part 7 by end of month',
      dueDate: new Date('August 31, 2020 23:00').toLocaleString('en-GB', {year: 'numeric', month: 'short', day: 'numeric'}),
      timeSpent: [],
      listId: 1,
      id: 2
    },
    {
      title: 'First version of Task Management Tool',
      description: 'Should be able to set timer and track tasks by the end of this month. Should also have a database',
      dueDate: new Date('September 1, 2020 23:00').toLocaleString('en-GB', {year: 'numeric', month: 'short', day: 'numeric'}),
      timeSpent: [],
      listId : 1,
      id: 3
    },
    {
      title: 'FCC javascript',
      description: 'No deadline for this. Do this when other tasks are too overwhelming',
      timeSpent: [],
      listId: 1,
      id: 4
    },
    {
      title: 'Find the species',
      description: 'My pet project. Must be clear on requirements first. Take it up after the Task management tool is complete',
      timeSpent: [],
      listId: 2,
      id: 5
    }
  ]
  
  const [lists, setLists] = useState(preloadedLists)
  const [cards, setCards] = useState(preloadedCards)
  const [showCard, setShowCard] = useState(false)
  const [cardToShow, setCardToShow] = useState('')

  const handleAddNewList = (title,...ignore) => {
      const listObject = {
        title,
        id: lists.length + 1
      }
      setLists(lists.concat(listObject))
  }
  const handleAddNewCard = (title,listId) => {
      const cardObject = {
        title,
        listId,
        id: cards.length + 1
      }
      setCards(cards.concat(cardObject))
  }

  const handleOpenCard = (id) => {  
    setShowCard(true)
    setCardToShow(cards.find(card => card.id === id))
  }

  return (
    <div className='App'>
      <header className='App-header'>
      <h1>Task Management App</h1>
      </header>
      <main className='main'>
      {lists.map(list => 
      <List 
        key={list.id} 
        list={list} 
        cardsInList={cards.filter(card => card.listId === list.id)}
        onAddCard={handleAddNewCard}
        onOpenCard={handleOpenCard}
      />)}
      <Modal show={showCard} onCloseModal={ () => setShowCard(false)}>
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
