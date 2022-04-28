import React, { useEffect, useState } from 'react'
import NavbarMain from './NavbarMain'
import { Container } from 'react-bootstrap'

export default function Pomodoro() {

   
    const [displayTime, setDisplayTime] = useState(25*60)

    const formatTime = (time) =>{
        let minutes = Math.floor(time/60)
        let seconds = time % 60
        return (
            (minutes <10 ?  "0" + minutes : minutes)+":"+  (seconds <10 ? "0" + seconds :seconds)
        )
    }

  

   
    
   
   


  return (
    <div>        <NavbarMain/>
    <Container className="d-flex align-items-center justify-content-center"
    style={{minHeight: "40vh"}}>
      <div>
      <h2>Pomodoro</h2>
      <strong>Plan your time</strong>
      <h3>{formatTime(displayTime)}</h3>
      </div>
 
    </Container>
    </div>
  )
}
