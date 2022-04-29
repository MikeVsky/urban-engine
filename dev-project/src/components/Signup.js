import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import app, {db} from '../firebase'
import { collection, addDoc } from 'firebase/firestore'


export default function Signup() {

    const nameRef=useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [active, setActive] = useState(true)
    document.title = "Register"
    async function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            await addDoc(collection(db, "users"),{
                name: nameRef.current.value,
                uid: app.auth().currentUser.uid,
                dateAdded: new Date(),
                mode: "light",
                active: true
            })
            navigate("/login")
        } catch{
            setError('Failed to create an account')
        }
        setLoading(false)
    }
     

  return (
      <div class="background-gradient">
      <Container
      className="d-flex align-items-center justify-content-center"
      style={{minHeight: "100vh", background: "linear-gradient(#6eb8cf, #608cca)"}}>
          <div className="w-100" style={{maxWidth: "500px"}}>
      <Card> 
          <Card.Body>
              <h2 className='text-center mb-4'>Register</h2>
              {error && <Alert variant="danger">  {error} </Alert>}
              <Form onSubmit={handleSubmit}>
              <Form.Group id="name" className='mt-3'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" ref={nameRef} required placeholder='Enter your name'/>
                  </Form.Group>
                  <Form.Group id="email" className='mt-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required placeholder='Enter your email'/>
                  </Form.Group>
                  <Form.Group id="password" className='mt-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} required placeholder='********'/>
                  </Form.Group>
                  <Form.Group id="password-confirm" className='mt-3'>
                      <Form.Label>Password Connfirmation</Form.Label>
                      <Form.Control type="password" ref={passwordConfirmRef} required placeholder='********'/>
                  </Form.Group>
                  <Button  id="btn-register" disabled={loading} className='w-100 mt-4' type="submit">Sign up</Button>
              </Form>

          </Card.Body>
      </Card>
      <div class='form-nav-box'>
        Already a member? <Link to="/Login" class="test">Login</Link>
      </div>
      </div>
      </Container>
      </div>

  )
}
