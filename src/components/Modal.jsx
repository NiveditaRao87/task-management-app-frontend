import React, { useEffect, useRef } from 'react'
import './Modal.css'
//Right now this is being used only for card detail. Can later be used for opening reports on time tracking.
//Adding accessibility to the Modal was not very easy. But there were quite a few learnings, ES6 Map,
// Node.contains and practice for DOM manipulation in react.

const Modal = ({ children, onCloseModal, freeze }) => {

  const modalRef = useRef()
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode)
      return listener && listener(e)
    }
    document.addEventListener('keydown', keyListener)

    return () => document.removeEventListener('keydown', keyListener)
  })

  const handleTabKey = (e) => {
    const focusableModalElements = modalRef.current.querySelectorAll(focusableElements)
    const firstFocusableElement = focusableModalElements[0]
    const lastFocusableElement = focusableModalElements[focusableModalElements.length - 1]
    if(!document.getElementById('modal').contains(document.activeElement)){
      //If focus is outside modal first bring it in and focus on the first focusable element.
      // Take care inside the children that the first focusable is x button so that it can be closed
      // easily on opening accidently.
      firstFocusableElement.focus()
      e.preventDefault() //Doesn't work properly without this what is the default behaviour, check
    }

    if(!e.shiftKey && document.activeElement === lastFocusableElement){
      firstFocusableElement.focus()
      e.preventDefault()
    }
    if(e.shiftKey && document.activeElement === firstFocusableElement){
      lastFocusableElement.focus()
      e.preventDefault()
    }

  }

  //freeze flag is set when there is an open form in the Modal which should be closed first
  const handleCloseModal = () => {
    !freeze && onCloseModal()
  }

  const keyListenersMap = new Map([[27, handleCloseModal], [9, handleTabKey]])

  return (
    <div>
      <div id='modal' aria-modal='true' role='dialog' >
        <div className='modal-content' ref={modalRef}>{ children }</div>
      </div>
      <div id='backdrop' onClick={handleCloseModal} />
    </div>)
}

export default Modal