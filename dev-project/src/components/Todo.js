import React, {useState} from "react"
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";


export default function Todo({
    todo,
    toggleComplete,
    handleDelete,
    handleEdit,
}) {

    const [newTitle, setNewTitle] =useState(todo.title)
    const [compNumber, setCompNumber] = useState(0)
    const handleChange = (e) => {
        e.preventDefault()
        if (todo.complete === true){
            setNewTitle(todo.title)
            setCompNumber(compNumber+1)
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
                onClick={() => toggleComplete(todo)}> 
                <FaCheck />
                </button>
        
                <button
                id="btn-edit"
                onClick={() => handleEdit(todo, newTitle)}> 
                <FaEdit/>
                </button>
         
                <button
                id="btn-delete"
                onClick={() => handleDelete(todo.id)}> 
                <FaTrash/>
                </button>
            </div>
        </div>
        
    )
}