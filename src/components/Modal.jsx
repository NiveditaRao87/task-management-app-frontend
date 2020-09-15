import React, { useEffect, useRef } from 'react'
import './Modal.css'
//Adding accessibility to the Modal was not very easy. But there were quite a few learnings, ES6 Map, 
// Node.contains and practice for DOM manipulation in react. 

const Modal = ({ children, onCloseModal }) => {
    
    const modalRef = useRef()
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    
    useEffect(() => {
        function keyListener(e) {
            const listener = keyListenersMap.get(e.keyCode)
            return listener && listener(e)
          }
          document.addEventListener("keydown", keyListener)
      
          return () => document.removeEventListener("keydown", keyListener)
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
        console.log(focusableModalElements, typeof focusableModalElements )
        console.log(document.activeElement)

        if(!e.shiftKey && document.activeElement === lastFocusableElement){
            firstFocusableElement.focus()
            e.preventDefault()
        }
        if(e.shiftKey && document.activeElement === firstFocusableElement){
            lastFocusableElement.focus()
            e.preventDefault()
        }

    }

    const keyListenersMap = new Map([[27, onCloseModal], [9, handleTabKey]])

    return (
    <div>
        <div id='modal' aria-modal='true' role='dialog' >
          <div ref={modalRef}>{ children }</div>
        </div>
        <div id='backdrop' onClick={onCloseModal} />
    </div>)
}

export default Modal