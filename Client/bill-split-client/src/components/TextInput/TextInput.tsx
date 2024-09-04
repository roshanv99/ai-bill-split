
import React from 'react'
import './TextInput.css'
type TextInput = {
    text:string,
    type:string,
    onChange:any
}
const TextInput = ({text,type,onChange}:TextInput) => {
  return (
    <div>
        <input className="text-box" type={type} value={text} onChange={(e) => onChange(e.target.value)}/>
    </div>
  )
}

export default TextInput