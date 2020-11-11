import React, { useRef, useState, useEffect } from 'react'
import { focusableElements } from '../constants'
import './AddArea.css'
// Reuseable add area for both card and form
const AddArea = ({ area, id, addNewItem }) => {

  const addFormWrapRef = useRef()
  const addFormRef = useRef()

  const [newItem, setNewItem] = useState('')
  const [showForm,setShowForm] = useState('')

  useEffect(() => {
    const handleClickOutside = e => {
      if (addFormWrapRef.current.contains(e.target)) {
        // inside click
        return
      }
      //Submit the form on outside click, it will make a new item (list/card) if the field is not empty.
      //In either case form will be closed on an outside click
      addFormRef.current.dispatchEvent(new Event('submit', { cancelable: true }))
    }
    if(showForm){
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[showForm])

  useEffect(() => {

   function keyDownListener(e) {
      const focusableFormElements = addFormWrapRef.current.querySelectorAll(focusableElements)
      const firstFocusableElement = focusableFormElements[0]
      const lastFocusableElement = focusableFormElements[focusableFormElements.length - 1]
      
      if(e.keyCode === 27){
        onCancel(e)
      }
      if(e.keyCode === 9 && !e.shiftKey && document.activeElement === lastFocusableElement){
        firstFocusableElement.focus()
        e.preventDefault()
      }
      if(e.keyCode === 9 && e.shiftKey && document.activeElement === firstFocusableElement){
        lastFocusableElement.focus()
        e.preventDefault()
      }
    }
    if(showForm){
      document.addEventListener('keydown', keyDownListener)
    }else {
    document.removeEventListener('keydown', keyDownListener)
    }
    
    return () => document.removeEventListener("keydown", keyDownListener);
  },[showForm])

  const onSubmit = e => {
    e.preventDefault()
    newItem && addNewItem(newItem,id) // ID is passed for card to identify on which list card should be created
    //Id will be null for a new list
    setNewItem('')
    setShowForm(false)
  }

  const onCancel = e => {
    e.preventDefault()
    setNewItem('')
    setShowForm(false)
  }

  return showForm ?
    <div className='add-form-wrapper' ref={addFormWrapRef}>
      <form id='add-form' ref={addFormRef} onSubmit={onSubmit} >
        <textarea
          id='add-input'
          placeholder={`Enter a title for the ${area}`}
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          autoFocus
        />
        <div className='add-area-btns'>
          <button type='submit' className='add-btn'> Add </button>
          <button type= 'reset' onClick={onCancel} className='cancel-btn'> Cancel </button>
        </div>
      </form>
    </div>
    : <button className={`add-${area}`} onClick={() => setShowForm(true)}>
      <i className="fas fa-plus"></i> <strong>Add {area}</strong></button>
}

export default AddArea