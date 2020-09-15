import React, { useState, useRef, useEffect } from 'react'
import './Editable.css'

// The reuseable editable component is used to show a text box when an element is clicked.
// When there is a tab out or when there is a click outside the textarea, it should call an update request
// which will then be handled in the parent component.
// This component also requires that the edit state be updated from the parent component, which can be done using useRef 
// and useImperativeHandle as explained here https://fullstackopen.com/en/part5/props_children_and_proptypes#references-to-components-with-ref 
// This component in its current state can only be used if there is just one child within this component which is what I want.
// Solved thanks to this link https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/

const Editable = ({ children, updateElement }) => {
    
    const [edit,setEdit] = useState(false)
    const [newValue,setNewValue] = useState('') 

    const formWrapRef = useRef()
    const formRef = useRef()

    useEffect(() => {
      
      setNewValue(children.props.children)
      
      const handleClickOutside = e => {
          if (formWrapRef.current.contains(e.target)) {
              // inside click
              console.log(e.target)
              return
            }
            console.log(e.target)
            //Submit the form on outside click
            formRef.current.dispatchEvent(new Event('submit'))
      }
      if(edit){
          document.addEventListener("mousedown", handleClickOutside)
          document.getElementById('editable').select()
      } else {
          document.removeEventListener("mousedown", handleClickOutside)
      }

      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      }
  },[edit, children.props.children ])

    const handleSubmit = e => {
      e.preventDefault()
      setEdit(false)
      updateElement(newValue)
  }
    
    return edit ? 
    <div ref={formWrapRef}>
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="editable" className='sr-only'>{`Textarea for ${children.props.className}`}</label> 
      <textarea
        className={`editable-${children.props.className}`}
        id='editable'
        autoFocus
        value={newValue}
        onChange={({ target }) => setNewValue(target.value)}
        onBlur={(e) => handleSubmit(e)}
      /> 
    </form>
    </div>
    : <div className='editable-child'
    onClick={() => setEdit(true)}
    onFocus={() => setEdit(true)}
    >{ children }</div>
}

export default Editable