import React from 'react'
import './Modal.css'

const Modal = ({ show, children, onCloseModal }) => {
    
    return show ? 
    <div>
        <div className='modal'>{ children }</div>
        <div className='backdrop' onClick={onCloseModal}/>
    </div>
    : null
}

export default Modal