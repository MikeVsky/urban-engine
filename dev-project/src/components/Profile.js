import React, { useEffect, useState } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import app, { db, storage } from '../firebase'
import NavbarMain from './NavbarMain'
import {
  collection,
  query,
  where,
  onSnapshot,
  doc
} from "firebase/firestore"

export default function Profile() {
  document.title = "Profile"
  const { currentUser, logout, upload } = useAuth()
  const navigate = useNavigate()
  const userRef = collection(db, 'users')
  const q = query(userRef, where("uid", "==", app.auth().currentUser.uid))
  const [userName, setUserName] = useState("")
  const [dateAdded, setDateAdded] = useState()
  const [totalTasks, setTotalTasks] = useState(0)
  const [sessionCount, setSessionCount] = useState(0)

  onSnapshot(doc(db, "users", app.auth().currentUser.uid), (doc) => {
    setTotalTasks(doc.get('totalTasks'))
  });

  onSnapshot(doc(db, "users", app.auth().currentUser.uid), (doc) => {
    setSessionCount(doc.get('timeSession'))
  })

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      let presentUser = [];

      querySnapshot.forEach((doc) => {

        setUserName(doc.get("name"))
        setDateAdded(doc.get("dateAdded").toDate().toString().slice(4, 15))
        presentUser.push({ ...doc.data(), id: doc.id });
      })
    });
    return () => unsub()
  });

  const formatTime = (time) => {
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor(time / 60 % 60)
    return (
      (hours < 10 ? "0" + hours : hours)+ " hours and " + (minutes < 10 ? "0" + minutes : minutes) + " minutes"
    )
  }

  async function handleLogout() {

    await logout()
    navigate("/login")
  }
  return (
    <div>
      <NavbarMain />
      <Container
        className="d-flex align-items-center justify-content-center mt-5">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body className="shadow p-3 ">
              <div className='black-text'>
                <h1 className="text-center mb-4">Profile</h1>
                <h3>User details</h3>
                <strong>Name: </strong>{userName}
                <br />
                <strong>Email: </strong>{currentUser.email}
                <br />
                <strong>Account created: </strong>{dateAdded}
                <br />
                <hr />
                <h3>User Statistics</h3>
                <strong>Total tasks done: </strong>{totalTasks}
                <br />
                <strong>Successful focus sessions: </strong>{sessionCount}
                <br />
                <strong>Time spent on focus: </strong>{formatTime(sessionCount * 60 * 25)}
              </div>
              <hr/>
              <div className='profile-buttons'>
              <Link to="/Profile-update" id="btn-update" aria-label="Update profile">Update profile</Link>
              
                <Button type="link" onClick={handleLogout} id='btn-logout' aria-label="Logout">Log out</Button>

              </div>

            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}
