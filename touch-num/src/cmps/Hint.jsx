import { useSelector } from "react-redux";
import hint from "../imgs/hint.png"
import { useEffect, useRef, useState } from "react";

export function Hint( { nextNum } ){
    const difficulty = useSelector((state) => state.difficulty);
    const [ showLightbolb, setShowLightbolb ] = useState( false )
    const kidsMode = useSelector((state) => state.kidsMode);
    let  timeoutRef = useRef(null)
    const [showHintState, setShowHintState] = useState(false);

    const showHint = () => {
        setShowHintState(true);

        // Clear any existing timeout before setting a new one
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowHintState(false);
        }, 6000);
    };

    useEffect(() => {
        return () => {
            // Cleanup the timeout when the component unmounts
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    function getHint(){
        return <>
            { difficulty == 25 ? (<div className="timer-box">
            <img src={hint} className="image-hint" onClick={showHint}/>
            </div>) : ""}
            &nbsp; &nbsp;
            { difficulty == 16 || showHintState ? (<div className="timer-box">
                <span> Next: </span>
            </div>) : ""} &nbsp;
            { difficulty == 16 || showHintState ? (<div className="colons"> <span> : </span></div>) : ""}  &nbsp;
            { difficulty == 16 || showHintState ? (<div className="timer-box">
                <div className="hint-wrapping"><div className="hint">{ nextNum } </div></div> 
            </div>) : "" }
        </> 
    }

    return (
        <div className={kidsMode ? "hint-container kids" : "hint-container"}>   
            {!kidsMode ?  getHint() : 
                <div className="hint-wrapping"><div className="hint">{ nextNum } </div></div> 
            }
           
            
        </div>
    )
}