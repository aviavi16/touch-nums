import { useEffect, useState } from "react"

export function Victory({ getTime , onReset ,onPause }){
    const [ time, setTime ] = useState(0)

    useEffect ( ()=>{   
        console.log('victory use effect getTime():', getTime)
        //setTime ( getTime())

    }, [time])

    function handleReset(){
        onReset();
    }

    function handlePause(){
        onPause();
    }

    function calculate(score){
        score = Math.floor(10000 - (10000*score)/(10000 + score))

        return score;
    }
    return (
        <section className="victory-container">
            <span className="score"> Score: {calculate(getTime)} </span>
            <div className="victory"></div>
            <div className="imposter">
                <div className="spacesuit">
                <div className="chest-and-head"></div>
                <div className="legs"></div>
                <div className="arm"></div>
                <div className="helmet-glass"></div>
                </div>
            </div>
            <div className="background"></div>
            <div className="name"></div>
            <button name="score" type="button" onClick={handlePause} className="new-game-btn" > Show Score </button>
            <button name="back" type="button" onClick={onReset} className="btn" > Quit </button>

        </section>
    )
    
}