import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Container} from "react-bootstrap"
export default function NavbarMain() {
  return (
    <div>
     <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="#action1">To-Do</Nav.Link>
        <Nav.Link href="#action1">Notes</Nav.Link>
        <Nav.Link href="#action1">Pomodoro</Nav.Link>
        <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
        

      </Nav>
      
    </Navbar.Collapse>
  </Container>
</Navbar>
  </div>
  )
}
