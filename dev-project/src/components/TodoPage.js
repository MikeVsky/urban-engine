import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import Todo from './Todo'
import app, { db } from '../firebase'
import { Card, Container } from "react-bootstrap"
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where
} from "firebase/firestore"
import NavbarMain from './NavbarMain'

export default function TodoPage() {

  const [todos, setTodos] = useState([])
  const [taskDone, setTaskDone] =useState(0)
  document.title = "To do"
  let taskLeft = todos.filter(todo => !todo.completed).length

  function SwitchCase() {
    switch (taskLeft) {
      case 0:
        return ' '
      case 1:
        return 'Only one task to go'
      default:
        return `You have ${taskLeft} tasks left`
    }
  }

  onSnapshot(doc(db, "users", app.auth().currentUser.uid), (doc) => {
    setTaskDone(doc.get('totalTasks'))
  });

  useEffect(() => {
    const todoRef = collection(db, "todos")
    const q = query(todoRef, where("uid", "==", app.auth().currentUser.uid))
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
    if (!todo.completed){
      await updateDoc(doc(db, "users", app.auth().currentUser.uid ), {totalTasks: taskDone+1})
    }else {
      await updateDoc(doc(db, "users", app.auth().currentUser.uid ), {totalTasks: taskDone-1})
    }
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <div>
      <NavbarMain />
      <Container
        className="d-flex align-items-center justify-content-center"
        >
          <Card className='mt-5'>
            <Card.Body className="shadow p-3 card-bg border-0"
            style={{minWidth: "30vw"}}>
              <h2 className='h2-align'> What's to be done for today?</h2>
              <AddTodo />
              <div >
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
              <div className="w-100 mt-3"> 
              <SwitchCase value={taskLeft}/>
              </div>
            </Card.Body>
          </Card>
        
      </Container>
    </div>
  )
}
