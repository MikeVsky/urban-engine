import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Container} from "react-bootstrap"
export default function NavbarMain() {
  return (
    <div>
     <Navbar bg="light" expand="lg">
    <Navbar.Brand as={Link} to= "/">Study Valley</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link as={Link} to= "/TodoPage"> To-Do</Nav.Link>
        <Nav.Link as={Link} to="/Notes">Notes</Nav.Link>
        <Nav.Link as={Link} to="/Timer">Pomodoro</Nav.Link>
        <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
        

      </Nav>
      
    </Navbar.Collapse>
    
</Navbar>
  </div>
  )
}
