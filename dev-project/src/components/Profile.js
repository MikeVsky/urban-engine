import React, {useEffect, useState} from 'react'
import {Card, Container, Button} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import  {Link, useNavigate} from 'react-router-dom'
import app, {db} from '../firebase'
import NavbarMain from './NavbarMain'
import {
  collection,
query, where, onSnapshot
 } from "firebase/firestore"

export default function Profile() {
    const {currentUser, logout} =  useAuth()
    const navigate = useNavigate()
    document.title = "Profile"
    const[user, setUser]=useState()
    const userRef = collection(db, 'users')
    const q = query(userRef, where ("uid", "==", app.auth().currentUser.uid))
    const[userName, setUserName] = useState("")
    const[dateAdded, setDateAdded] = useState()
    useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      let userss = [];

      
      querySnapshot.forEach((doc) => {
        setUserName(doc.get("name"))
        setDateAdded(doc.get("dateAdded").toDate().toString().slice(4, 15))
        userss.push({ ...doc.data(), id: doc.id });
      })
      setUser(userss)
    });
    return () => unsub()
  }, []);

console.log(user)
   async function  handleLogout() {

        await logout()
        navigate("/login")
    }
  return (
    <>
    <NavbarMain/>
  <Container
      className="d-flex align-items-center justify-content-center"
      style={{minHeight: "50vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    <strong>Name: </strong>{userName}
                    <br/>
                    <strong>Email: </strong>{currentUser.email}
                    <br />
                    <strong>Account created: </strong>{dateAdded}
                    <Link to="/Profile-update" className="btn btn-primary w-100 mt-3" id="btn-update">Update profile</Link>
                    <div className="w-100 text-center mt-4">
                    <Button type="link" onClick={handleLogout} style={{backgroundColor: "red", borderColor: "red"}}>Log out</Button>

                    </div>

                </Card.Body>
            </Card>
          </div>
          </Container>
    </>
  )
}
/*
*/