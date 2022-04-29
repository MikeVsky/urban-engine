import React from 'react'
import NavbarMain from './NavbarMain'
import { Container} from 'react-bootstrap'


export default function Dashboard() {
  document.title = "Study Valley"

  return (
    <div>
  
          <div>  <NavbarMain /></div>
        <Container
      className="d-flex align-items-center justify-content-center"
      style={{minHeight: "70vh"}}>
        <h3>Lets focus on some work</h3>
        </Container>

    </div>
  )
}
