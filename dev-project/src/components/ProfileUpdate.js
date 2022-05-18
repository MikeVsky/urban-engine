import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import NavbarMain from "./NavbarMain"
export default function ProfileUpdate() {
  document.title = "Profile update"
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {

    e.preventDefault()
    const promises = []
    

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
    }

    setLoading(true)
    setError("")
  
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <NavbarMain />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "50vh" }}>
        <div className="w-100 black-text" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <div className="w-100 text-center mt-4">
                  <Button disabled={loading} className="w-100" id="btn-update" type="submit">
                    Update
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/Profile" className="link-decoration">Go back</Link>
          </div>
        </div>
      </Container>
    </div>
  )
}