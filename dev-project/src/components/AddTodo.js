import React, { useState } from 'react'
import app, {db} from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import {FaPlus} from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyTodo = () => toast('You can\'t add empty task', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })


export default function AddTodo() {
    const [title, setTitle] = useState("")

    async function handleSubmit(e)  {
        e.preventDefault();

        if (title !== ""){
            await addDoc(collection(db, "todos"),{
                title,
                completed: false,
                uid: app.auth().currentUser.uid
            })
        }
        else {
            notifyTodo()
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
      <ToastContainer />
      </div>
  )
}
