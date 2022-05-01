import React, { useEffect, useState } from 'react'
import NavbarMain from './NavbarMain'
import { Container } from 'react-bootstrap'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillStar} from "react-icons/ai";
import app, {db} from '../firebase'
import { collection, updateDoc,doc, query, onSnapshot, where, getDocs } from 'firebase/firestore'

export default function Pomodoro() {

    document.title = "Pomodoro"
    const [displayTime, setDisplayTime] = useState(3)
    const [totalTime, setTotalTime] = useState(3)
    const [shortBrake, setShortBrake] = useState(3)
    const [sessionTime, setSessionTime] = useState(3)
    const [timerOn, setTimerOn] = useState(false)
    const [totalScore, setTotalScore] = useState(0)
    const [level, setLevel] =useState(0)
    const [wasStopped, setWasStopped] = useState(false)
    const value =displayTime/totalTime
    const [barColor, setBarColor] = useState('62, 152, 199')
   // const userRef = collection(db, 'users')
    //const q = query(userRef, where ("uid", "==", app.auth().currentUser.uid))
    //const [presentUser, setPresentUser] = useState([])
/*
    console.log(presentUser)
    useEffect(() => {
     
   
     const unsub = onSnapshot(q, (querySnapshot) => {
        
  
        querySnapshot.forEach((doc) => {
          
          setTotalScore(doc.get('score'))
          setLevel(doc.get('level'))
          presentUser.push({ ...doc.data(), id: doc.id });
        })
      });
      return () => unsub()
    }, )
*/

    const notify = () => toast('Good job with your task, you earn yourself a star', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });;

  console.log(wasStopped)
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
        setBarColor('62, 152, 199')
      }
     
    }

    function handleShort(){
      if (!timerOn){
        setDisplayTime(5*60)
        setShortBrake(5*60)
        setTotalTime(5*60)
        setBarColor('124,252,0')
      }
     
    }

    function handleLong(){
      if (!timerOn){
        setDisplayTime(15*60)
        setTotalTime(15*60)
        setBarColor('124,252,0')
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
            handleReset()

          }
          if(sessionTime >= 3 && prev <=1 && !wasStopped){
           setTotalScore(totalScore+1)
            notify()
            handleReset()
            addLevel()
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

    function handleReset(){
      setDisplayTime(3)
      setSessionTime(3)
      setTotalTime(3)
      setShortBrake(5*60)
      clearInterval(localStorage.getItem('interval-id'))
      setTimerOn(false)
      setWasStopped(false)
    }

    function addLevel(){
      if (totalScore >= 3){
        setTotalScore(0)
        setLevel(level+1)
      }
      return level
    }

    function SwitchCase(props) {
      switch(props.value) {
        case 1:
          return <h1><AiFillStar/></h1>
        case 2:
          return <h1><AiFillStar/> <AiFillStar/></h1>
          case 3:
          return <h1><AiFillStar/> <AiFillStar/> <AiFillStar/></h1>
        default:
          return 
      }
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
      
     
      <CircularProgressbar value={value} maxValue={1} text={`${Math.round(value*100)}%`}
      styles={buildStyles({pathColor: `rgba(${barColor}, ${Math.round(value*100)}`})}
      >
   
      </CircularProgressbar>
      <div><h2>{formatTime(displayTime)}</h2></div>
      
      <div>
        <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Restart</button>
      
     
      </div>
      <SwitchCase value={totalScore} />
      </div>
    <div>
      level: {level}
    </div>
      <ToastContainer />
    </Container>
    </div>
  )
}
