import React from 'react'

const Modal = ({ show, children, onCloseModal }) => {
    
    const modalStyle = {
      position: 'fixed',
      zIndex: 10,
      top: '10vh',
      width: 'auto',
      height: '100%',
      left: '25%',
      right: '25%',
      overflow: 'auto',
      backgroundColor: 'white',
      border: '1px solid black',
      padding: '20px'
    }
    const backdropStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        zIndex: '9',
        background: 'rgba(0, 0, 0, 0.4)'
      }
  

    // show? document.querySelector('#App').style.backgroundColor = 'rgba(0,0,0,0.4)' : null
    
    return show ? 
    <div>
        <div style={modalStyle}>{ children }</div>
        <div style={backdropStyle} onClick={onCloseModal}/>
    </div>
    : null
}

export default Modal