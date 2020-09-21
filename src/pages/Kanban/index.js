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
  const [freezeModal, setFreezeModal] = useState('')

  useEffect(() => {

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
        setLists(lists.map(l => l.id !== list ? l : { ...l,cards: l.cards.concat({
          title: returnedCard.title,
          dueDate: returnedCard.dueDate,
          tickingFrom: returnedCard.tickingFrom,
          id: returnedCard.id
        })
        }))
      })
  }

  const handleOpenCard = async (id) => {
    setShowCard(true)
    setCardToShow(id)

  }

  const handleCloseModal = () => {
    setShowCard(false)
    setCardToShow(null)
  }
  const handleUpdateList = ({ list,id,title,oldList }) => {
    //If the card has not been moved update the card info in the list
    !oldList
      ? setLists(
        lists
          .map(l => l.id !== list
            ? l
            : { ...l, cards: l.cards.map(cardInList => cardInList.id !== id ? cardInList : { id, title }) })
      ) // If the card has been moved, add it to the new list and delete from old
      : setLists(lists.map(l => l.id === list
        ? { ...l,cards: [...l.cards,{ id, title }] }
        : l.id === oldList
          ? { ...l,cards: l.cards.filter(card => card.id !== id ) }
          : l
      ))
  }
  const handleUpdateTitle = (updatedList) => {
    setLists(lists.map(list => list.id !== updatedList.id ? list : updatedList))
  }

  const handleDeleteCard = card => {
    setLists(lists.map(l => l.id !== card.list.id ? l : { ...l,cards: l.cards.filter(c => c.id !== card.id) } ))
  }

  const handleDeleteList = id => {
    listService.remove(id)
    setLists(lists.filter(list => list.id !== id))
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
            onAddCard={handleAddNewCard}
            onOpenCard={handleOpenCard}
            updateTitle={handleUpdateTitle}
            onDelete={handleDeleteList}
          />)}
        {showCard && <Modal onCloseModal={handleCloseModal} freeze={freezeModal}>
          <CardDetails
            card={cardToShow}
            onCardClose={handleCloseModal}
            updateList={handleUpdateList}
            makeModalStatic={flag => setFreezeModal(flag)}
            lists={lists}
            removeFromList={handleDeleteCard}
          />
        </Modal>}
        <AddArea
          area='list'
          id={null}
          addNewItem={handleAddNewList}
        />
      </main>
      <footer className='board-footer'>
        <p className='attribution'>
          <span>Photo by </span>
          <a href='https://www.instagram.com/vikranthupili/' target='_blank' rel='noopener noreferrer'>Vikranth Thupili</a>
        </p>
      </footer>
    </div>
  )
}

export default Kanban
