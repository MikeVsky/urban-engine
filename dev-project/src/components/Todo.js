import React, {useState} from "react"
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";


export default function Todo({
    todo,
    toggleComplete,
    handleDelete,
    handleEdit,
}) {

    const [newTitle, setNewTitle] =useState(todo.title)
    const handleChange = (e) => {
        e.preventDefault()
        if (todo.complete === true){
            setNewTitle(todo.title)
        }
        else {
            todo.title = "";
            setNewTitle(e.target.value)
        }
    }
    return (
        <div id="todo-result">
            <input
            className="input-width input-bg"
            style={{textDecoration: todo.completed && "line-through"}}
            type= "text"
            value = {todo.title === "" ? newTitle : todo.title}
            onChange={handleChange}
            /> 
            <div className="todo-buttons">
                <button
                id="btn-done"
                onClick={() => toggleComplete(todo)}
                aria-label="Mark as done"> 
                <FaCheck />
                </button>
        
                <button
                id="btn-edit"
                onClick={() => handleEdit(todo, newTitle)}
                aria-label="Note edit"> 
                <FaEdit/>
                </button>
         
                <button
                id="btn-delete"
                onClick={() => handleDelete(todo.id)}
                aria-label="Delete note"> 
                <FaTrash/>
                </button>
            </div>
        </div>
        
    )
}