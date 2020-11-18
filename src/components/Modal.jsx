import React, { useEffect, useRef } from 'react'
import { focusableElements } from '../constants'
import './Modal.css'
// Reuseable Modal component, right now this is being used only for card detail. Can later be used for opening
// reports on time tracking.
// References - https://peteris.rocks/blog/modal-window-in-react-from-scratch/
//              https://tinloof.com/blog/how-to-create-an-accessible-react-modal/ - Code has an error and works 
//              only because there are only two focusable elements in the modal but otherwise great.

const Modal = ({ children, onCloseModal, freeze }) => {

  const modalRef = useRef()

  useEffect(() => {
    function keyDownListener(e) {
      const listener = keyDownListenersMap.get(e.keyCode)
      return listener && listener(e)
    }
    document.addEventListener('keydown', keyDownListener)

    return () => document.removeEventListener('keydown', keyDownListener)
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
      e.preventDefault()
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
    console.log(freeze)
    !freeze && onCloseModal()
  }

  const keyDownListenersMap = new Map([[27, handleCloseModal], [9, handleTabKey]])

  return (
    <div>
      <div id='modal' aria-modal='true' role='dialog' >
        <div className='modal-content' ref={modalRef}>{ children }</div>
      </div>
      <div id='backdrop' onClick={handleCloseModal} />
    </div>)
}

export default Modal