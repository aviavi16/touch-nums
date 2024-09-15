import { useEffect, useRef, useState } from "react";
import "../css/stop-watch.css";

export function StopWatch( { time } ){
    const [timer, setTimer] = useState(time);
    const [isRunning, setIsRunning] = useState(false);
    let  timeInterval = useRef(null)

    useEffect(() => {
        setTimer(time)
    }, [ time ])
        
    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 6000).toString().padStart(2, "0");
        const seconds = Math.floor((timer / 100) % 60).toString().padStart(2, "0");
      
        return { minutes, seconds };
    };
      
    const { minutes, seconds } = formatTime(timer);

    return (
        <section className="stopWatch-container">
            <h2 > Time: </h2>
            <div className="timer-container">
                <div className="timer-box">
                    <h1>{minutes}</h1>
                </div>
                <span className="colon">:</span>
                <div className="timer-box">
                    <h1>{seconds}</h1>
                </div>
            </div>
        </section>
    )
}