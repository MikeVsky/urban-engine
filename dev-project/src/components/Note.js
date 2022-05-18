import React from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
export default function Note({
  note,
  handleDelete}) {


  return (
    <div className='note'>
      <h3>{note.title}</h3>
      <span>{note.text}</span>
      <div className='note-footer'>
        <small>{note.date} </small>
          <div className='note-delete-button'>
          <TiDeleteOutline size="3em" color='white' onClick={() => handleDelete(note.id)}/>
          </div>
         
  


      </div>


    </div>
  )
}
