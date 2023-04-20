import React, { useEffect, useState } from "react";
import NavbarMain from "./NavbarMain";
import { Container } from "react-bootstrap";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillStar } from "react-icons/ai";
import app, { db } from "../firebase";
import { doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";

export default function Pomodoro() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [shortBrake, setShortBrake] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [totalLevel, setTotalLevel] = useState(0);
  const [wasStopped, setWasStopped] = useState(false);
  const [onBrake, setOnBrake] = useState(false);
  const value = displayTime / totalTime;
  const [sessionCount, setSessionCount] = useState(0);
  const [barColor, setBarColor] = useState("62, 152, 199");
  let sessionType = onBrake !== true ? "Focus" : "Brake";

  /* window.onfocus = function (ev) {
     handleStart()
 };
 window.onblur = function (ev) {
   if (timerOn){
     document.title = "Timer has been stoped"
     handleStop()
   }
  
 };*/

  useEffect(() => {
    document.title = "Pomodoro";
  }, []);

  onSnapshot(doc(db, "userScore", app.auth().currentUser.uid), (doc) => {
    setTotalScore(doc.get("score"));
    setTotalLevel(doc.get("level"));
  });

  onSnapshot(doc(db, "users", app.auth().currentUser.uid), (doc) => {
    setSessionCount(doc.get("timeSession"));
  });

  const notifyScore = () =>
    toast("Good job with your task, you earn yourself a star", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyLevel = () =>
    toast("Congratulations you have leveled up", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  function handleSession() {
    if (!timerOn) {
      setWasStopped(false);
      setDisplayTime(25 * 60);
      setSessionTime(25 * 60);
      setTotalTime(25 * 60);
      setBarColor("62, 152, 199");
      setOnBrake(false);
    }
  }

  function handleShort() {
    if (!timerOn) {
      setWasStopped(false);
      setDisplayTime(5 * 60);
      setShortBrake(5 * 60);
      setTotalTime(5 * 60);
      setBarColor("184, 224, 210");
      setOnBrake(true);
    }
  }

  function handleLong() {
    if (!timerOn) {
      setWasStopped(false);
      setDisplayTime(15 * 60);
      setTotalTime(15 * 60);
      setBarColor("184, 224, 210");
      setOnBrake(true);
    }
  }
  function handleStart() {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    if (!timerOn && displayTime !== 0) {
      let interval = setInterval(() => {
        setTimerOn(true);
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 1 && !onBrake) {
              if (sessionTime >= 2 && !wasStopped) {
                updateScore();
                updateLevel();
              }
              clearInterval(localStorage.getItem("interval-id"));
              setOnBrake(true);
              setTimerOn(false);
              handleShort();
              updateDoc(doc(db, "users", app.auth().currentUser.uid), {
                timeSession: sessionCount + 1,
              });
            }
            if (prev <= 1 && onBrake) {
              setOnBrake(false);
              clearInterval(localStorage.getItem("interval-id"));
              setTimerOn(false);
              handleSession();
            }
            window.document.title = formatTime(prev - 1);
            return prev - 1;
          });
          nextDate += second;
        }
      }, 1000);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
  }
  function handleStop() {
    setWasStopped(true);
    clearInterval(localStorage.getItem("interval-id"));
    setTimerOn(false);
  }

  function handleReset() {
    setDisplayTime(3);
    setSessionTime(3);
    setTotalTime(3);
    setShortBrake(5 * 60);
    clearInterval(localStorage.getItem("interval-id"));
    setTimerOn(false);
    setWasStopped(false);
    setOnBrake(false);
    setBarColor("62, 152, 199");
  }

  function updateScore() {
    notifyScore();
    setDoc(doc(db, "userScore", app.auth().currentUser.uid), {
      uid: app.auth().currentUser.uid,
      score: totalScore + 1,
      level: totalLevel,
    });
  }
  function updateLevel() {
    if (totalScore >= 3) {
      notifyLevel();
      setDoc(doc(db, "userScore", app.auth().currentUser.uid), {
        uid: app.auth().currentUser.uid,
        score: 0,
        level: totalLevel + 1,
      });
    }
    return totalLevel;
  }

  function SwitchCase(props) {
    switch (props.value) {
      case 1:
        return (
          <h1>
            <AiFillStar size="1.5em" color="gold" />
          </h1>
        );
      case 2:
        return (
          <h1>
            <AiFillStar size="1.5em" color="gold" />{" "}
            <AiFillStar size="1.5em" color="gold" />
          </h1>
        );
      case 3:
        return (
          <h1>
            <AiFillStar size="1.5em" color="gold" />{" "}
            <AiFillStar size="1.5em" color="gold" />{" "}
            <AiFillStar size="1.5em" color="gold" />
          </h1>
        );
      default:
        return;
    }
  }

  return (
    <div>
      <NavbarMain />
      <Container className="d-flex align-items-center justify-content-center mt-5">
        <div className="time-display">
          <div className="time-buttons">
            <button onClick={handleSession}>Work</button>
            <button onClick={handleShort}>Short</button>
            <button onClick={handleLong}>Long</button>
          </div>

          <strong className="text-center mt-3 mb-3">
            Plan your time wisely
          </strong>

          <CircularProgressbarWithChildren
            value={value}
            maxValue={1}
            text={`${formatTime(displayTime)}`}
            styles={buildStyles({
              pathColor: `rgba(${barColor}, ${Math.round(value * 100)}`,
            })}
          >
            <div style={{ fontSize: 20, marginTop: 80 }}>{sessionType}</div>
          </CircularProgressbarWithChildren>
          <div className="time-buttons mt-4">
            <button onClick={handleStart} aria-label="Start timer">
              Start
            </button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Restart</button>
            <br />
          </div>
          <div className="text-center mt-4 score">
            {" "}
            <SwitchCase value={totalScore} />
          </div>

          <strong className="text-center mt-4 mb-3">
            Focus level: {totalLevel}
          </strong>
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
}
