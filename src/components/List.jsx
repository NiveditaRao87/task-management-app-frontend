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

const List = ({ list, cardsInList, onAddCard, onOpenCard, updateTitle }) => {

    return (<div className='list'>
    <Editable 
    type='text'
    //Since title is a required field if it has been left empty no updation will occur
    updateElement={newTitle => newTitle && updateTitle({...list,title: newTitle})} 
    >
      <h2 tabIndex="0" className='list-title' aria-label="List title">{list.title}</h2>
    </Editable>
    <div className='cards-wrapper'>
      {cardsInList.map(card => <Card key={card.id} card={card} onOpenCard={onOpenCard} />)}
    </div>
    <AddArea  
        area='card'
        addNewItem={onAddCard} 
        id={list.id}
        /> 
    </div>)
}

export default List