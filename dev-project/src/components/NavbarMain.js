import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from "react-bootstrap"

export default function NavbarMain() {
  
const date = new Date().toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
  return (
  <div>
  <Navbar expand="lg" className='navbarbg container-fluid' > 

    <Navbar.Brand as={Link} to= "/">
    <img src="logo-white.png" width="100" alt="website logo" className="d-inline-block align-middle ms-3" />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbarScroll" className='hamburger-toggle' />
    <Navbar.Collapse id="navbarScroll" className="nav-text">

      <Nav className="ms-auto my-1 my-lg-0" navbarScroll>  
        <Nav.Link className="date" disabled>{date}</Nav.Link>
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

