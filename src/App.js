import React, { useState } from 'react'
import './App.css'
import List from './components/List'
import AddArea from './components/AddArea'

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
      listId: 0,
      id: 0
    },
    {
      title: 'Javascript perusteet',
      listId: 0,
      id: 1
    },
    {
      title: 'Full stack open course',
      listId: 1,
      id: 2
    },
    {
      title: 'First version of Task Management Tool',
      listId : 1,
      id: 3
    },
    {
      title: 'FCC javascript',
      listId: 1,
      id: 4
    },
    {
      title: 'Find the species',
      listId: 2,
      id: 5
    }
  ]
  
  const [lists,setLists] = useState(preloadedLists)
  const [cards,setCards] = useState(preloadedCards)

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

      />)}
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
