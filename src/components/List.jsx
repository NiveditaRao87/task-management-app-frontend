import React from 'react'
import AddArea from './AddArea'
import Editable from './Editable'
import './List.css'

const Card = ({ card, onOpenCard }) => {


  return <div
    tabIndex="0"
    className='card'
    onClick={() => onOpenCard(card.id)}
    onKeyDown={(e) => e.key === 'Enter' && onOpenCard(card.id)}
  >
    <p>{card.title}</p>
  </div>
}

const List = ({ list, onAddCard, onOpenCard, updateTitle, onDelete }) => {

  return (<div className='list'>
    <Editable
    //Since title is a required field if it has been left empty no update will occur
      updateElement={newTitle => newTitle && updateTitle({ ...list,title: newTitle })}
    >
      <h2 tabIndex="0" className='list-title' aria-label="List title">{list.title}</h2>
    </Editable>
    <div className='cards-wrapper'>
      {list.cards.length !== 0 ? list.cards.map(card => <Card key={card.id} card={card} onOpenCard={onOpenCard} />)
        : <div onClick={() => onDelete(list.id)}>
          <label htmlFor='delete-list' className='sr-only'>Delete list</label>
          <i id='delete-list' className="fas fa-trash-alt" tabIndex='0'></i>
        </div>
      }
    </div>
    <AddArea
      area='card'
      addNewItem={onAddCard}
      id={list.id}
    />
  </div>)
}

export default List