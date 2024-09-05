import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const dialog = useRef();
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  //sec * 1000 = milliseconds, because the setInterval is in milliseconds
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);


  // function handleStart(){
  //   timer.current = setTimeout(()=>{
  //     setTimerExpired(true);
  //     dialog.current.open();
  //   }, targetTime*1000);

  //   setTimerStarted(true);
  // }

  const timerIsActive = (timeRemaining > 0) && (timeRemaining < targetTime*1000);

  //need to stop if the time is up
  if(timeRemaining <= 0){
    clearInterval(timer.current);
    dialog.current.openModal();
  }
  
  function handleReset(){
    setTimeRemaining(targetTime*1000);
  }

  function handleStart(){
    //set interval executes every 10 milliseconds
    timer.current = setInterval(()=>{
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
    }, 10);
  }

  // function handleStop(){
  //   clearTimeout(timer.current);
  // }

  function handleStop(){
    dialog.current.openModal();
    clearInterval(timer.current);
  }

  return (
    <>
    <ResultModal 
      ref={dialog} 
      targetTime={targetTime}
      remainingTime={timeRemaining}
      onReset={handleReset}
    />
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerIsActive ? 'active' : undefined}>
        {timerIsActive ? 'Time is Running' : 'Timer inactive'}
      </p>
    </section> 
    </>
  );
}