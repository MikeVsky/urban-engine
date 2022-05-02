import React from 'react'
import { FiDelete } from 'react-icons/fi'
export default function Note({
  note,
  handleDelete}) {


  return (
    <div className='note'>
      <h3>{note.title}</h3>
      <span>{note.text}</span>
      <div className='note-footer'>
        <small>{note.date} </small>

          <FiDelete size="1.5em" onClick={() => handleDelete(note.id)}/>
  


      </div>


    </div>
  )
}
