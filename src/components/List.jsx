import React from 'react'
import AddArea from './AddArea'
import './List.css'

const Card = ({ card }) => {
    return <div className='card'>
    <p>{card.title}</p>
    </div>
}


const List = ({ list, cardsInList, onAddCard }) => {
    
    return (<div className='list'>
    <h2>{list.title}</h2>
    <div className='cards-wrapper'>
      {cardsInList.map(card => <Card key={card.id} card={card} />)}
    </div>
    <AddArea  
        area='card'
        addNewItem={onAddCard} 
        id={list.id}
        /> 
    </div>)
}

export default List