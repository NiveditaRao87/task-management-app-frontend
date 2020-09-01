import React, { useState } from 'react'
import './Editable.css'

// The reuseable editable component is used to show a text box when an element is clicked.
// When there is a tab out or when there is a click outside the textarea, it should call an update request
// which will then be handled in the parent component.
// This component also requires that the edit state be updated from the parent component, which can be done using useRef 
// and useImperativeHandle as explained here https://fullstackopen.com/en/part5/props_children_and_proptypes#references-to-components-with-ref 
// This component in its current state can only be used if there is just one child within this component.
// This solution will work but I think I will end up using too many refs so should I use a reducer?
const Editable = ({ children, updateElement }) => {
    
    const [edit,setEdit] = useState(false)
    const [newValue,setNewValue] = useState(children.props.children) 

    const handleSubmit = () => {
        setEdit(false)
        updateElement(newValue)
    }
    
    return edit ? 
    <form onSubmit={handleSubmit}>
      <textarea
        className='editable'
        autoFocus
        value={newValue}
        onChange={({ target }) => setNewValue(target.value)}
      /> 
    </form>
    : <>{ children }</>
}

export default Editable