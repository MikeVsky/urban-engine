import React, { useEffect, useState } from 'react'
import NavbarMain from './NavbarMain'
import { Container } from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Pomodoro() {

    document.title = "Pomodoro"
    const [displayTime, setDisplayTime] = useState(5)
    const [totalTime, setTotalTime] = useState(5)
    const [shortBrake, setShortBrake] = useState(3)
    const [sessionTime, setSessionTime] = useState(5)
    const [timerOn, setTimerOn] = useState(false)
    const [score, setScore] = useState(0)
    const [wasStopped, setWasStopped] = useState(false)
    const value =displayTime/totalTime

        const formatTime = (time) =>{
        let minutes = Math.floor(time/60)
        let seconds = time % 60
        return (
            (minutes <10 ?  "0" + minutes : minutes)+ ":" + (seconds <10 ? "0" + seconds :seconds)
        )
    }
  
    function handleSession(){
      if(!timerOn){
        setDisplayTime(25*60)
        setSessionTime(25*60)
        setTotalTime(25*60)
      }
     
    }

    function handleShort(){
      if (!timerOn){
        setDisplayTime(5*60)
        setShortBrake(5*60)
        setTotalTime(5*60)
      }
     
    }

    function handleLong(){
      if (!timerOn){
        setDisplayTime(15*60)
        setTotalTime(15*60)
      }
    }

    function handleStart(){
   let second =1000
   let date = new Date().getTime()
   let nextDate = new Date().getTime() + second
   if(!timerOn && displayTime !== 0){
     let interval = setInterval(() => {
       setTimerOn(true)
      date = new Date().getTime()
      if (date > nextDate){
        setDisplayTime((prev) =>{
          if (prev <=1){
            clearInterval(localStorage.getItem('interval-id'))
            setTimerOn(false)
            
          }
          if(sessionTime >= 25*60 && prev <=1 && !wasStopped){
            setScore(score+1)
          }
          document.title = formatTime(prev -1)
          return prev -1
        })
        nextDate += second
      }
     },1000)
     localStorage.clear();
     localStorage.setItem('interval-id', interval)

   }
    }
    function handleStop(){
      setWasStopped(true)
      clearInterval(localStorage.getItem('interval-id'))
      setTimerOn(false)
    }


  return (
    <div>        <NavbarMain/>
    <Container className="d-flex align-items-center justify-content-center"
    style={{minHeight: "60vh"}}>
      <div className='time-display'>
      <h2>Pomodoro</h2>
    <div className='time-buttons'>
    <button onClick={handleSession}>Work</button>
      <button onClick={handleShort}>Short</button>
      <button onClick={handleLong}>Long</button>
    </div>
      
      <strong>Plan your time</strong>
      
     
      <CircularProgressbar value={value} maxValue={1} text={`${Math.round(value*100)}%`}>
   
      </CircularProgressbar>
      <div><h2>{formatTime(displayTime)}</h2></div>
      
      <div>
        <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      </div>
      Score: {score}
      </div>
 
    </Container>
    </div>
  )
}
