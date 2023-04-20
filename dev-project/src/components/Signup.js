import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import app, { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  document.title = "Register";
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      nameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      passwordConfirmRef.current.value === ""
    ) {
      return setError("Please fill out all the blanks");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    if (passwordRef.current.value.length <= 5) {
      return setError("Password need to have atleast 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      await setDoc(doc(db, "users", app.auth().currentUser.uid), {
        uid: app.auth().currentUser.uid,
        name: nameRef.current.value,
        totalTasks: 0,
        timeSession: 0,
        dateAdded: new Date(),
      });
      await setDoc(doc(db, "userScore", app.auth().currentUser.uid), {
        uid: app.auth().currentUser.uid,
        score: 0,
        level: 0,
      });

      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use");
      }
      if (err.code === "auth/invalid-email") {
        setError("Email is in wrong format");
      }
    }

    setLoading(false);
  }

  return (
    <div className="background-gradient">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(#6eb8cf, #608cca)",
        }}
      >
        <div className="w-100 black-text" style={{ maxWidth: "500px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              {error && <Alert variant="danger"> {error} </Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name" className="mt-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <Form.Group id="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group id="password" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="********"
                  />
                </Form.Group>
                <Form.Group id="password-confirm" className="mt-3">
                  <Form.Label>Password Connfirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="********"
                  />
                </Form.Group>
                <Button
                  id="btn-register"
                  disabled={loading}
                  className="w-100 mt-4"
                  type="submit"
                >
                  Sign up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="form-nav-box">
            Already a member?{" "}
            <Link to="/Login" className="test">
              Login
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
