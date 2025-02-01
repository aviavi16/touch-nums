import { useEffect, useState } from "react"
import translations from "../translations.json";

export function Victory({ getTime , onReset ,onPause , lang  }){

    function handlePause(){
        onPause();
    }

    function calculate(score){
        score = Math.floor(10000 - (10000*score)/(10000 + score))

        return score;
    }
    return (
        <section className="victory-container">
            <div className="win-title-container">
                <div className="victory"> {translations[lang].victory} </div>
                <span className="score"> {translations[lang].score} {calculate(getTime)} </span>

            </div>
            
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
            <button name="score" type="button" onClick={handlePause} className="show-score-btn" > {translations[lang].showScore} </button>
            <button name="back" type="button" onClick={onReset} className="btn" > {translations[lang].quit} </button>

        </section>
    )
    
}