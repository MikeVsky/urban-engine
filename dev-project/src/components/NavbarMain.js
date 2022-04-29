import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from "react-bootstrap"
import { ThemeContext } from '../contexts/Theme'
import ReactSwitch from 'react-switch'
export default function NavbarMain() {
  const [{theme}, toggleTheme] = useContext(ThemeContext)

  return (
   <div>
     <Navbar bg="light" expand="lg" className='container-fluid'>
       
    <Navbar.Brand as={Link} to= "/">Study Valley</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <label>{theme  === 'light' ? 'Light mode' : 'Dark mode'}</label>
    <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'}/>
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="ms-auto my-1 my-lg-0"
        navbarScroll
      >
        
        <Nav.Link as={Link} to= "/TodoPage"> To-Do</Nav.Link>
        <Nav.Link as={Link} to="/Notes">Notes</Nav.Link>
        <Nav.Link as={Link} to="/Pomodoro">Pomodoro</Nav.Link>
        <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
        

      </Nav>
      
    </Navbar.Collapse>
</Navbar>
  </div> 
  )
}

