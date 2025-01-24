import { useEffect, useRef, useState } from "react";

export function Buttons( { newGame, pauseGame, quitGame , gameStarted} ){
    return (
        <section className="buttons-container">  
                {gameStarted ?  
                    (<button name="pause" type="button" onClick={pauseGame} className="new-game-btn" > Options </button>)
                    :(<button name="start" type="button" onClick={newGame} className="new-game-btn" >  New Game </button>)
                }              
                {/* <button name="start" type="button" onClick={newGame} className="new-game-btn" > New Game </button>
                <button name="pause" type="button" onClick={pauseGame} className="new-game-btn" > Pause Game </button>
                <button name="quit" type="button" onClick={quitGame} className="new-game-btn" > Quit Game </button> */}
        </section>
    )
}