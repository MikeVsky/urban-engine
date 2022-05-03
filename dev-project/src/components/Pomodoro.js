import React, { useEffect, useState } from 'react'
import NavbarMain from './NavbarMain'
import { Container } from 'react-bootstrap'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillStar } from "react-icons/ai";
import app, { db } from '../firebase'

import { doc, getDoc, setDoc, onSnapshot, collection, query, where } from "firebase/firestore";


export default function Pomodoro() {

  document.title = "Pomodoro"
  const [displayTime, setDisplayTime] = useState(3)
  const [totalTime, setTotalTime] = useState(3)
  const [shortBrake, setShortBrake] = useState(5)
  const [sessionTime, setSessionTime] = useState(3)
  const [timerOn, setTimerOn] = useState(false)
  const [totalScore, setTotalScore] = useState(1)
  const [totalLevel, setTotalLevel] = useState(0)
  const [wasStopped, setWasStopped] = useState(false)
  const [onBrake, setOnBrake] = useState(false)
  const value = displayTime / totalTime
  const [barColor, setBarColor] = useState('62, 152, 199')

  const userScoreRef = collection(db, 'userScore')
  const q = query(userScoreRef, where("uid", "==", app.auth().currentUser.uid))




  const notify = () => toast('Good job with your task, you earn yourself a star', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    )
  }

  function handleSession() {
    if (!timerOn) {
      setWasStopped(false)
      setDisplayTime(3)
      setSessionTime(3)
      setTotalTime(3)
      setBarColor('62, 152, 199')
    }

  }

  function handleShort() {
    if (!timerOn) {
      setWasStopped(false)
      setDisplayTime(5)
      setShortBrake(5)
      setTotalTime(5)
      setBarColor('184, 224, 210')
      setOnBrake(true)
    }

  }

  function handleLong() {
    if (!timerOn) {
      setWasStopped(false)
      setDisplayTime(15 * 60)
      setTotalTime(15 * 60)
      setBarColor('184, 224, 210')
    }
  }

  function handleStart() {
    let second = 1000
    let date = new Date().getTime()
    let nextDate = new Date().getTime() + second
    if (!timerOn && displayTime !== 0) {
      let interval = setInterval(() => {
        setTimerOn(true)
        date = new Date().getTime()
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 1 && !onBrake) {
              clearInterval(localStorage.getItem('interval-id'))
              setTimerOn(false)
              handleShort()
            }
            if ((prev <= 1 && onBrake)) {
              setOnBrake(false)
              clearInterval(localStorage.getItem('interval-id'))
              setTimerOn(false)
              handleSession()
            }
            if (sessionTime >= 2 && prev <= 1 && !onBrake) {

              addScore()
              notify()
              handleShort()
              addScore()
              addLevel()

            }
            document.title = formatTime(prev - 1)
            return prev - 1
          })
          nextDate += second
        }
      }, 1000)
      localStorage.clear();
      localStorage.setItem('interval-id', interval)

    }
  }
  function handleStop() {
    setWasStopped(true)
    clearInterval(localStorage.getItem('interval-id'))
    setTimerOn(false)
  }

  function handleReset() {
    setDisplayTime(3)
    setSessionTime(3)
    setTotalTime(3)
    setShortBrake(5 * 60)
    clearInterval(localStorage.getItem('interval-id'))
    setTimerOn(false)
    setWasStopped(false)
  }

  function updateScore() {
    setDoc(doc(db, "usersScore", app.auth().currentUser.uid), {
      uid: app.auth().currentUser.uid,
      score: totalScore + 1,
      level: totalLevel
    });
  }
  function addScore() {

    setTotalScore(totalScore + 1)
    updateScore()
  }
  function addLevel() {
    if (totalScore >= 3) {
      setTotalScore(0)
      setTotalLevel(totalLevel + 1)
      updateScore()
    }
    return totalLevel
  }

  function SwitchCase(props) {
    switch (props.value) {
      case 1:
        return <h1><AiFillStar /></h1>
      case 2:
        return <h1><AiFillStar /> <AiFillStar /></h1>
      case 3:
        return <h1><AiFillStar /> <AiFillStar /> <AiFillStar /></h1>
      default:
        return
    }
  }

  return (
    <div>
      <NavbarMain />
      <Container className="d-flex align-items-center justify-content-center mt-5">
        <div className='time-display'>
          <h1 className='text-center'>Pomodoro</h1>
          <div className='time-buttons'>
            <button onClick={handleSession}>Work</button>
            <button onClick={handleShort}>Short</button>
            <button onClick={handleLong}>Long</button>
          </div>

          <strong className='text-center mt-3'>Plan your time wisely</strong>


          <CircularProgressbar value={value} maxValue={1} text={`${Math.round(value * 100)}%`}
            styles={buildStyles({ pathColor: `rgba(${barColor}, ${Math.round(value * 100)}` })}
          >

          </CircularProgressbar>
          <div><h2 className='text-center'>{formatTime(displayTime)}</h2></div>

          <div className='time-buttons'>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Restart</button>


          </div>
          <div className='text-center mt-4'> <SwitchCase value={totalScore} /></div>

          <strong className='text-center mt-4 mb-3' >level: {totalLevel}</strong>
        </div>
        <ToastContainer />
      </Container>
    </div>
  )
}
