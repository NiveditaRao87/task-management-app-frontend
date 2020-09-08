import React from 'react'
import AddArea from './AddArea'
import Editable from './Editable'
import './List.css'

const Card = ({ card, onOpenCard }) => {
    
    return <div className='card' onClick={() => onOpenCard(card.id)}>
    <p>{card.title}</p>
    </div>
}

const List = ({ list, cardsInList, onAddCard, onOpenCard }) => {

    return (<div className='list'>
    <Editable type='text'>
      <h2 className='list-title'>{list.title}</h2>
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