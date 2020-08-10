import React, {useState} from 'react'
import './List.css'

const Card = ({ card }) => {
    return <div className='card'>
    <h4>{card.title}</h4>
    </div>
}

const AddCard = ({ onAddCard, addCardListId, id, newCard, onCardInput, addNewCard }) => {
    if(addCardListId){
      //Render a new form on the list if add card is true, will be true only for the list whose id is passed 
      return <form onSubmit={(e) => addNewCard(e,id,newCard)} >
          <textarea 
              placeholder='Enter a title for this card...'
              value={newCard}
              onChange={onCardInput}
          />
          <button type='submit'> Add </button>
      </form>
    }
    return <button className='add-card' onClick={() => onAddCard(id)}> + Add card</button>
}
const List = ({ list, cardsInList, onAddCard, addCardListId, newCard, onCardInput, addNewCard }) => {
    
    return (<div className='list'>
    <h3>{list.title}</h3>
    <div className='cards-wrapper'>
      {cardsInList.map(card => <Card key={card.id} card={card} />)}
    </div>
    <AddCard onAddCard={onAddCard} 
        addCardListId={addCardListId === list.id}  
        id={list.id} 
        newCard={newCard} 
        onCardInput={onCardInput}
        addNewCard={addNewCard} />
    </div>)
}

// const Lists = ({ lists, cards, addNewCard, onAddCard, addCardListId }) => {
//     const [newCard,setNewCard] = useState('')

//     const handleCardInput = (e) => {
//         //Input from the textarea of the add card form
//         setNewCard(e.target.value)
//     }
//     return <div className='lists-wrap'>
//       {lists.map(list => 
//       <List key={list.id} 
//             list={list} 
//             cardsInList={cards.filter(card => card.listId === list.id)}
//             addCardListId={addCardListId}
//             onAddCard={onAddCard}
//             newCard={newCard}
//             onCardInput={handleCardInput} 
//             addNewCard={addNewCard}
//             />)}
//     </div>
// }

export default List;