import React, { useEffect, useState } from 'react'
import NavbarMain from './NavbarMain'
import { Container } from 'react-bootstrap'

export default function Pomodoro() {

   
    const [displayTime, setDisplayTime] = useState(25*60)
    const [breakTime, setBreakTime] = useState(5*60)
    const [sessionTime, setSessionTime] = useState(25*60)
    const [timerOn, setTimerOn] = useState(false)
    const [onBreak, setOnBreak] = useState(false)

        const formatTime = (time) =>{
        let minutes = Math.floor(time/60)
        let seconds = time % 60
        return (
            (minutes <10 ?  "0" + minutes : minutes)+ ":" + (seconds <10 ? "0" + seconds :seconds)
        )
    }

    const changeTime = (amount) =>{}
  //    if (type =='break')}
    function Length({title, changeTime, type, time, formatTime}){
      return (
        <div>
          <h3>{title}</h3>
          <div className='time-sets'>
            <button onClick={() => changeTime(-60, type)}>test</button>
            <h3>{formatTime(time)}</h3>
            <button>test2</button>

          </div>
        </div>
      )

    }
   
    
    
   
   


  return (
    <div>        <NavbarMain/>
    <Container className="d-flex align-items-center justify-content-center"
    style={{minHeight: "40vh"}}>
      <div>
      <h2>Pomodoro</h2>
      <strong>Plan your time</strong>
      <Length
      title={"break length"}
      changeTime = {changeTime}
      type={"break"}
      time={null}
      formatTime={formatTime}
      />
      <h3>{formatTime(displayTime)}</h3>
      </div>
 
    </Container>
    </div>
  )
}
