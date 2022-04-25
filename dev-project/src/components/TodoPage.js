import React, {useEffect, useState} from 'react'
import AddTodo from './AddTodo'
import Todo from './Todo'
import app, {db} from '../firebase'
import {Container} from "react-bootstrap"
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where} from "firebase/firestore"
import NavbarMain from './NavbarMain'

export default function TodoPage() {

    const [todos, setTodos] =useState([])
    document.title = "To do"

    useEffect(() => {
      const todoRef = collection(db, "todos")
      const q = query(todoRef, where ("uid", "==", app.auth().currentUser.uid))
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];

        
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todosArray);
      });
      return () => unsub();
    }, []);
  
    const handleEdit = async (todo, title) => {
      await updateDoc(doc(db, "todos", todo.id), { title: title });
    };
    const toggleComplete = async (todo) => {
      await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
    };
    const handleDelete = async (id) => {
      await deleteDoc(doc(db, "todos", id));
    };
  return (
    <>
    <NavbarMain/>
     <Container
      className="d-flex align-items-center justify-content-center"
      style={{minHeight: "30vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
    <h2>What's to be done for today?</h2>
    <AddTodo />
       <div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
      </div>
      </Container>
    </>
  )
}