
import React,{useState} from 'react'
import app, {db} from '../firebase'
import { collection, addDoc  } from 'firebase/firestore'


export default function AddNote() {
    const[noteTitle, setNoteTitle] = useState('')
    const[noteText, setNoteText] = useState('')
    const date = new Date()
    const handleSave =async (e) =>{
        e.preventDefault()

      
            if(noteTitle!==''&& noteText!==''){
                await addDoc(collection(db, "notes"),{
                    title: noteTitle,
                    text: noteText,
                    date: date.toLocaleDateString(),
                    uid: app.auth().currentUser.uid 
                }      
                )
            }
            setNoteTitle('')
            setNoteText('')
            }
            
      
  return (
    <div className='note new'>
         <textarea
         className='title-placeholder'
         rows='1'
         cols='10'
         placeholder='Add Title...'
         onChange={(e) => setNoteTitle(e.target.value)}
         value={noteTitle}
         ></textarea>
          <textarea
          className='text-placeholder'
         rows='8'
         cols='10'
         placeholder='Type something  to add a note...'
         onChange={(e) =>setNoteText(e.target.value)}
         value={noteText}
         ></textarea>
         <div className='save-footer'>
            <button className='save' onClick={handleSave}>Save</button>
         </div>
         </div>
  )
}
