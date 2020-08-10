import React, { useState } from 'react'
import './App.css'
import List from './components/List'

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
  // This state stores the list id on which an add card has been requested, it will then be used to conditionally
  // render the add card form 
  const [addCardListId,setAddCardListId] = useState('')
  //Input from textarea of new card
  const [newCard,setNewCard] = useState('')

  const handleAddCard = (listId) => {
    setAddCardListId(listId)
  }

  const handleCardInput = (e) => {
    //Input from the textarea of the add card form
    setNewCard(e.target.value)
  }

  const handleAddNewCard = (event,listId,title) => {
    event.preventDefault()
    const cardObject = {
      title,
      listId,
      id: cards.length + 1
    }
    setCards(cards.concat(cardObject))
    setAddCardListId(null) //so that the add card form wont be rendered 
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
      <h1>Task Management App</h1>
      </header>
      <main className='main'>
      {lists.map(list => 
      <List key={list.id} 
            list={list} 
            cardsInList={cards.filter(card => card.listId === list.id)}
            addCardListId={addCardListId}
            onAddCard={handleAddCard}
            newCard={newCard}
            onCardInput={handleCardInput} 
            addNewCard={handleAddNewCard}
            />)}
        <button className='add-list'> + Add List</button>
      </main>
    </div>
  )
}

export default App
