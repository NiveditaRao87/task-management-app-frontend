import React, { useState, useEffect, useContext } from 'react'
import List from '../../components/List'
import AddArea from '../../components/AddArea'
import CardDetails from '../../components/CardDetailsModal/CardDetails'
import Project from '../../components/ProjectModal/Project'
import Modal from '../../components/Modal'
import listService from '../../services/lists'
import cardService from '../../services/cards'
import projectService from '../../services/projects'
import storage from '../../utils/storage'
import './Kanban.css'
import { UserContext } from '../../contexts/user-context'
import { TimerContext } from '../../contexts/timer-context'

const Kanban = () => {

  const [lists, setLists] = useState('')
  const [projects, setProjects] = useState('')
  const [showCard, setShowCard] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [cardToShow, setCardToShow] = useState('')
  const [timerCard, setTimerCard] = useState('')
  const { setIsAuthenticated } = useContext(UserContext)
  const { timerOn } = useContext(TimerContext)
  const [freezeModal, setFreezeModal] = useState('')

  useEffect(() => {

    listService
      .getAll()
      .then(initialLists => {
        setLists(initialLists)
      })
    projectService
      .getAll()
      .then(projects => {
        setProjects(projects)
      })

    cardService
      .getTimer()
      .then(timer =>
      {
        if(!timer.noTimerOn){
          storage.saveTimer(timer)
        }
      })
  },[])

  useEffect(() => {
    setTimerCard(storage.loadTimer())
  }, [timerOn])

  const handleAddNewList = (title,) => {
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

  const handleCloseCard = () => {
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

  const handleUpdateProject = projects => {
    setProjects([...projects])
  }
  const handleUpdateTitle = (updatedList) => {
    setLists(lists.map(list => list.id !== updatedList.id ? list : updatedList))
  }

  const handleDeleteCard = card => {
    setLists(lists.map(l => l.id !== card.list.id ? l : { ...l,cards: l.cards.filter(c => c.id !== card.id) } ))
  }

  const handleDeleteList = id => {
    if(!window.confirm('Are you sure you want to delete this list?')) return
    listService.remove(id)
    setLists(lists.filter(list => list.id !== id))
  }

  const handleLogout = () => {
    storage.logoutUser()
    setIsAuthenticated(false)
  }

  const handleCloseProjects = ()  => {
    setShowProjects(false)
  }

  const handleOpenProjects = () => {
    setShowProjects(true)
  }


  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='app-title'>µTasker</h1>
        <button className='primary project' onClick={handleOpenProjects}>Projects</button>
        <button className='primary logout' onClick={handleLogout}>Logout</button>
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
            timerCard={timerCard}
          />)}
        {showCard && <Modal onCloseModal={handleCloseCard} freeze={freezeModal}>
          <CardDetails
            card={cardToShow}
            onCardClose={handleCloseCard}
            updateList={handleUpdateList}
            makeModalStatic={flag => setFreezeModal(flag)}
            lists={lists}
            projects={projects}
            removeFromList={handleDeleteCard}
          />
        </Modal>}
        {showProjects && <Modal onCloseModal={handleCloseProjects} freeze={freezeModal}>
          <Project
            projects={projects}
            onCloseProjects={handleCloseProjects}
            updateProject={handleUpdateProject}
            makeModalStatic={flag => setFreezeModal(flag)}
            setFreezeModal={setFreezeModal}
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
