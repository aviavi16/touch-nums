import {  useMemo, useState } from "react";
import boopSfx from '../sounds/mixkit-fairy-cartoon-success-voice-344.wav';
import failSfx from '../sounds/mixkit-tech-break-fail-2947.wav';
import { Hint } from "./Hint";
import { useSelector, useDispatch } from "react-redux";
import { startGame, resetGameAction, activateKidsMode, disableKidsMode } from "../store/game/game.reducer";
import kidMode from "../imgs/kidsMode.png"
import adultMode from "../imgs/adultMode.jfif"

export function GameTable ({  win, isWin , lang }) {
    const [currentNumber, setCurrentNumber] = useState(0);
    const gameStarted = useSelector((state) => state.gameStarted); // ✅ Correct
    const dispatch = useDispatch(); // Redux dispatcher
    const difficulty = useSelector((state) => state.difficulty);
    const kidsMode = useSelector((state) => state.kidsMode);
    const muteEffects = useSelector((state) => state.muteEffects);

    const resetGame = () => {
        console.log("Resetting game...");
        dispatch(resetGameAction()); // ✅ Set gameStarted to false
    
        setTimeout(() => {
            dispatch(startGame()); // ✅ Restart game
            console.log("Game restarted!");
        }, 0); // Small delay to trigger re-render
    };

    // ✅ Shuffle numbers only when the game starts
    const shuffledNums = useMemo(() => {
        if (!gameStarted) return []; // Avoid rendering empty numbers before game starts
        const effectiveDifficulty = kidsMode ? 16 : difficulty; // ✅ Force 16 if kidsMode is ON
        setCurrentNumber(0)
        
        let allNums = Array.from({ length: effectiveDifficulty }, (_, i) => i)
        allNums = shuffleArray([...allNums])
        // Split into rows of sqrt difficulty columns each
        let rows = []
        let numOfRows = Math.sqrt(effectiveDifficulty)
        for (let i = 0; i < allNums.length; i += numOfRows) {
            rows.push(allNums.slice(i, i + numOfRows));
        }
        return rows
    }, [gameStarted]); // ✅ Only shuffles when `gameStarted` changes

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5)
    }

    function choose(num, cell) {
        console.log('cell:', cell)
        if (num === currentNumber) {
            success();
            cell.className += ' choose';
        } else {
            blink(cell);
            fail();
        }
    }

    function fail() {
        console.log("muteEffects:", muteEffects);
        if (!muteEffects) {
            const sound = new Audio(failSfx);
            sound.play();
        }
    }

    function blink(cell){
        cell.classList.toggle('blink'); // Toggles the blink animation
    }

    function success(){
        if (!muteEffects) { // Only play sound if not muted
            const sound = new Audio(boopSfx); // Create an audio instance
            sound.play(); // Play the sound
        }
        setCurrentNumber (prev => prev + 1)
        console.log('currentNumber:', currentNumber,  " ", difficulty)
        if ( currentNumber === difficulty - 1) 
            win()
    }

    
    function KidsModeOff() {
        dispatch(disableKidsMode())
        dispatch(resetGameAction())
    }

    function KidsModeOn() {
        dispatch(activateKidsMode())
        dispatch(resetGameAction()); // ✅ Set gameStarted to false
    
        setTimeout(() => {
            dispatch(startGame()); // ✅ Restart game
            console.log("Game restarted!");
        }, 0); // Small delay to trigger re-render
    }

    return (
        <div className={!kidsMode ? "hints-modes-container" : "hints-modes-kids-container"}>
            {!kidsMode && ( 
                <div className="kids-icon-container">
                    <img className="kids-mode-image" onClick={KidsModeOn}  src={kidMode}/> 
                </div>)
            }
            {kidsMode && ( 
                <div className="adult-icon-container">
                    <img className="adult-mode-image" onClick={KidsModeOff}  src={adultMode}/> 
                </div>)
            }
            &nbsp; &nbsp;
            {gameStarted && !isWin && (<Hint className="hint-container" nextNum={currentNumber} lang={lang} />)}
            { gameStarted && !isWin ? 
                ( <table className="table">
                    <tbody>
                        {shuffledNums.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                            {row.map((num) => (
                                <td key={num} className="td" onClick={(event)=> choose(num, event.currentTarget)}>
                                    {num}
                                </td>
                            ))}
                        </tr>))}
                    </tbody>
                </table>) :  ""}
        </div>
    );
};

