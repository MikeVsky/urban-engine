import React, { useState } from 'react'
import app, {db} from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import {FaPlus} from "react-icons/fa"

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
        setTitle("")
    }
  return (
      <div id="add-todo">
      <form onSubmit={handleSubmit}>
        <input 
        height="100px"
        type="text"
        placeholder='Enter your task...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>
        <button id="btn-add"><FaPlus size="1.3em" color='white'/></button>
      </form>
      </div>
  )
}
