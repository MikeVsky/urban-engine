import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from "react-bootstrap"

export default function NavbarMain() {
  

  return (
   <div>
     <Navbar expand="lg" className='navbarbg container-fluid'>
       
    <Navbar.Brand className="nav-text" as={Link} to= "/">Study Valley</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll" className="nav-text">
      <Nav
        className="ms-auto my-1 my-lg-0"
        navbarScroll
      >
        
        <Nav.Link as={Link} to= "/TodoPage" className="nav-text"> To-Do</Nav.Link>
        <Nav.Link as={Link} to="/Notes" className="nav-text">Notes</Nav.Link>
        <Nav.Link as={Link} to="/Pomodoro" className="nav-text">Pomodoro</Nav.Link>
        <Nav.Link as={Link} to="/Profile"className="nav-text">Profile</Nav.Link>
        

      </Nav>
      
    </Navbar.Collapse>
</Navbar>
  </div> 
  )
}

