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
            class="input-width"
            style={{textDecoration: todo.completed && "line-through"}}
            type= "text"
            value = {todo.title === "" ? newTitle : todo.title}
            onChange={handleChange}
            />
            <div>
                <button
                id="btn-done"
                onClick={() => toggleComplete(todo)}> 
                <FaCheck/>
                </button>
            </div>
            <div>
                <button
                id="btn-edit"
                onClick={() => handleEdit(todo, newTitle)}> 
                <FaEdit/>
                </button>
            </div>
            <div>
                <button
                id="btn-delete"
                onClick={() => handleDelete(todo.id)}> 
                <FaTrash/>
                </button>
            </div>
        </div>
        
    )
}