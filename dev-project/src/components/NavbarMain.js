import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from "react-bootstrap"

export default function NavbarMain() {
  

  return (
   <div>
     <Navbar expand="lg" className='navbarbg container-fluid'>
       
    <Navbar.Brand as={Link} to= "/">Study Valley</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="ms-auto my-1 my-lg-0"
        navbarScroll
      >
        
        <Nav.Link as={Link} to= "/TodoPage" className="link-text"> To-Do</Nav.Link>
        <Nav.Link as={Link} to="/Notes" className="link-text">Notes</Nav.Link>
        <Nav.Link as={Link} to="/Pomodoro" className="link-text">Pomodoro</Nav.Link>
        <Nav.Link as={Link} to="/Profile"className="link-text">Profile</Nav.Link>
        

      </Nav>
      
    </Navbar.Collapse>
</Navbar>
  </div> 
  )
}

