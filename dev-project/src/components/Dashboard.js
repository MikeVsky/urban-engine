import React, {useContext} from 'react'
import NavbarMain from './NavbarMain'
import { Container} from 'react-bootstrap'
import { ThemeContext } from '../contexts/Theme'
import ReactSwitch from 'react-switch'

export default function Dashboard() {
  document.title = "Study Valley"
  const [{theme}, toggleTheme] = useContext(ThemeContext)
  return (
    <div>
  
          <div>  <NavbarMain /></div>
        <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{minHeight: "70vh"}}>
        <h3>Lets focus on some work</h3>
        <br />
        <div  className='dark-toggle'>
        <label>{theme  === 'light' ? 'Light mode' : 'Dark mode'}</label>
    <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'}/>
        </div>
       
        </Container>

    </div>
  )
}
