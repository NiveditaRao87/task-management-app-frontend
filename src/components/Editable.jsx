import React, { useState, useRef, useEffect } from 'react'
import './Editable.css'

// The reuseable editable component is used to show a text box when an element is clicked.
// When there is a tab out or when there is a click outside the textarea, it should call an update request
// which will then be handled in the parent component. An optional isEditing function is passed as a prop which is
// used to indicate that the Editable component is in editing mode. This was done to make sure that, if Editable is a
// child of a Modal then the Modal can be frozen when editable is clicked so an outside click would result in closing
// of editable component but not the Modal (closing both at once was causing memory leaks by updating state after unmount)
// Reference blogs - https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82
//                   https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/

const Editable = ({ children, updateElement, placeholder, isEditing }) => {

  const [edit,setEdit] = useState(false)
  const [newValue,setNewValue] = useState('')

  const formWrapRef = useRef()
  const formRef = useRef()

  useEffect(() => {

    setNewValue(children.props.children)

    const handleClickOutside = e => {
      if (formWrapRef.current.contains(e.target)) {
        // inside click
        return
      }
      //Submit the form on outside click
      formRef.current.dispatchEvent(new Event('submit'))
    }
    if(edit){
      document.addEventListener('mousedown', handleClickOutside)
      document.getElementById('editable').select()
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[edit, children.props.children ])

  const handleSubmit = e => {
    e.preventDefault()
    setEdit(false)
    placeholder !== newValue && updateElement(newValue)
  }

  const handleEdit = () => {
    setEdit(true)
    isEditing && isEditing(true)
  }

  return edit ?
    <div className='editable-form-wrapper' ref={formWrapRef}>
      <form className='editable-form' ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="editable" className='sr-only'>{`Textarea for ${children.props.className}`}</label>
        <textarea
          className={`editable-${children.props.className}`}
          id='editable'
          autoFocus
          placeholder={placeholder}
          value={placeholder === newValue ? '' : newValue}
          onChange={({ target }) => setNewValue(target.value)}
          onBlur={(e) => handleSubmit(e)}
        />
      </form>
    </div>
    : <div className='editable-child'
      onClick={handleEdit}
      onFocus={handleEdit}
    >{ children }</div>
}

export default Editable