import React, { useState } from 'react'
import app, {db} from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
export default function AddTodo() {
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title !== ""){
            await addDoc(collection(db, "todos"),{
                title,
                completed: false,
                uid: app.auth().currentUser.uid
            })
        }
    }
  return (
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder='Enter your task...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>
        <button>Add</button>
      </form>
  )
}
