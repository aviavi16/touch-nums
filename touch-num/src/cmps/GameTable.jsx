import { useEffect, useMemo, useState } from "react";
import boopSfx from '../sounds/mixkit-fairy-cartoon-success-voice-344.wav';
import failSfx from '../sounds/mixkit-tech-break-fail-2947.wav';
import { Hint } from "./Hint";

export function GameTable ({ gSize, isGameStarted , muteEffects, kidsMode}) {
    const [currentNumber, setCurrentNumber] = useState(0);

    // ✅ Shuffle numbers only when the game starts
    const shuffledNums = useMemo(() => {
        if (!isGameStarted) return []; // Avoid rendering empty numbers before game starts
        console.log("Shuffling numbers...");
        let allNums = Array.from({ length: gSize }, (_, i) => i);
        allNums = shuffleArray([...allNums]);
        // Split into rows of sqrt gSize columns each
        let rows = [];
        let numOfRows = Math.sqrt(gSize)
        for (let i = 0; i < allNums.length; i += numOfRows) {
            rows.push(allNums.slice(i, i + numOfRows));
        }
        console.log('rows:', rows)
        return rows;
    }, [isGameStarted]); // ✅ Only shuffles when `isGameStarted` changes

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
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
        console.log('muteEffects:', muteEffects, !muteEffects)
        if (!muteEffects) { // Only play sound if not muted
            console.log('muteEffects:', muteEffects)

            const sound = new Audio(boopSfx); // Create an audio instance
            sound.play(); // Play the sound
        }
        setCurrentNumber (prev => prev + 1)
        if ( currentNumber === gSize) 
            win()
    }

    return (
        <div className="game-table-container">
            {isGameStarted &&  (<Hint className="hint-container" nextNum={currentNumber} kidsMode={kidsMode}/>)}
            { isGameStarted ? 
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

