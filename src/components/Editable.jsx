import React from 'react'

const Editable = ({ edit, children, type, value, onChange }) => {
    
    return edit ? 
    <form>
      <input 
        type={type}
        autofocus
        value={value}

      /> 
    </form>
    : { children }
}

export default Editable