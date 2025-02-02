import { Buttons } from "./Buttons";
import { StopWatch } from "./StopWatch";
import { PauseMenu } from "./PauseMenu";
import { useEffect, useRef, useState } from "react";
import { Victory } from "./Victory";
import mapBg from "../imgs/map.png"
import { GameTable } from "./GameTable";
import { useDispatch, useSelector } from "react-redux";
import { activateEffects, activateSound, muteEffects, muteSound, pauseGame, resetGameAction, resumeGame, setDifficulty, startGame } from "../store/game/game.reducer";
import VolumeIcon from '../svg/volume.svg?react'
import MuteIcon from '../svg/mute.svg?react'
import translations from "../translations.json";

export function MainPanel({ lang , userInteracted }){
    const gameStarted = useSelector((state) => state.gameStarted);
    const gamePaused = useSelector((state) => state.gamePaused);
    const kidsMode = useSelector((state) => state.kidsMode);
    const [ isWin, setIsWin ] = useState( false )
    const[ isNewGame, setIsNewGame ] = useState( true )
    const [ nextNum , setNextNum ] = useState( 0 )
    const [ timer, setTimer ] = useState( 0 )
    let  _currentNumber = useRef(0)
    let  timeInterval = useRef(null)
    const [ tableSize, setTableSize] = useState(16)
    const dispatch = useDispatch(); // Redux dispatcher
    const isMute = useSelector((state) => state.muteSound);
    const isEffects = useSelector((state) => state.muteEffects);

    var gDifficulty = 'Easy'
    var gSize = 16; 

    useEffect(()=>{
        console.log("gamePaused changed:", gamePaused); // ✅ Debug log

        if (gamePaused) {
            clearInterval(timeInterval.current)
            // Perform your effect (e.g., pause the game)
        } else{
            console.log("Resuming game: starting timer...");
            timeInterval.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 10); // ✅ Use previous state
            }, 10);
        }
        return () => clearInterval(timeInterval.current); // ✅ Cleanup interval on unmount

    }, [gamePaused])

    const changeDifficulty = (level) => {
        dispatch(setDifficulty(level));
        console.log(`Difficulty changed to: ${level}`);
    };

    function win(){
        clearInterval(timeInterval.current);
        setNextNum(0)
        setIsWin(true)
        const el = document.querySelector('.victory-container')
        el.classList.add('show')
    }

    function openNew(){
        const elName = document.querySelector('.modal')
        elName.showModal()
    }

    const handlePause = () => {
        dispatch(pauseGame())
        clearInterval(timeInterval.current);
    }

    function startGameMenu(){
        if (document.querySelector('.difficulty-container'))
            gDifficulty = document.querySelector('.difficulty-container').value;
        switch (gDifficulty){
            case 'Medium':
                gSize = 25;
                changeDifficulty(25)
                break;
            case 'Hard':
                gSize = 36;
                changeDifficulty(36)
                break;
            case 'Easy': 
            default:
                gSize = 16;
                changeDifficulty(16)
                break;
        }
        setTimer(0)
        dispatch(startGame())
        onCloseModal();
    }

    const handleStart = () => {
        dispatch(resumeGame())
    }

    function restartGame(){
        //promt?
        setNextNum(0)
        console.log("Resetting game...");
        dispatch(resetGameAction()); // ✅ Set gameStarted to false
        setTimer(0)
        onClosePause()
        openNew()
    }

    function openPause(){
        const elName = document.querySelector('.pause-modal')
        elName.showModal() 
        handlePause()
    }

    function onClosePause(){
        document.querySelector('.pause-modal').close()
        handleStart()
    }

    function onCloseModal() {
        document.querySelector('.modal').close()
    }

    const handleReset = () => {
        console.log("Resetting game...");
  
        setIsWin(false)
        const el = document.querySelector('.victory-container.show')
        if(el){
            el.className = 'victory-container';
        }
        
        dispatch(resetGameAction())
        setNextNum(0)
        clearInterval(timeInterval.current);
        setTimer(0);
        _currentNumber.current = 0;     
    }

    const handleTest = () => {
        const el = document.querySelector('.score')
        el.classList.add('show')

    }
    
    function muteVolume(){
        dispatch(muteSound());
        dispatch(muteEffects());
    }
    
    function activateVolume(){
        dispatch(activateSound());
        dispatch(activateEffects());
    }
   
    return (
        <div className="app-bg-container">
            <Victory getTime={timer} onReset={handleReset} onPause={handleTest} lang={lang} /> 
            
            {/* <div class="blinking-element">Blink Me!</div>
            <button id="blink-button" onClick={blink}>Start Blinking</button> */}
            <div className="app-container">
                <div className="buttons-watch-container">
                    <div className={kidsMode ? "display-panel-container kids" : "display-panel-container"}>
                        {userInteracted && ( // Hide button until user interacts
                            isMute  && isEffects ? (
                                <MuteIcon 
                                    alt="Mute Icon" 
                                    className={!kidsMode ? "icon mute-button" : "icon-kids mute-button"} 
                                    onClick={activateVolume} 
                                />                                     
                            ) : (
                                <VolumeIcon 
                                    alt="Sound Icon" 
                                    className={!kidsMode ? "icon mute-button" : "icon-kids mute-button"} 
                                    onClick={muteVolume} 
                                />   
                            )
                        )}   
                        <div className="centered-panel">
                            <Buttons startGameMenu={openNew} openPause={openPause} lang={lang}/>
                            {gameStarted && (<StopWatch time={timer} kidsMode={kidsMode }/>)}
                        </div>            
                    </div>   
                </div>

                <section className="table-container">
                    <dialog className="modal">
                        <h3 className={lang === 'he' ? "dificulty-header-heb": "dificulty-header-eng"}> {translations[lang].dificultyHeader} </h3>
                        <select  
                            className="difficulty-container"
                            name="difficulty"
                        >  
                        <option value="Easy"> {translations[lang].dificulty1} </option>
                        <option value="Medium"> {translations[lang].dificulty2} </option>
                        <option value="Hard"> {translations[lang].dificulty3} </option>


                        </select>
                    

                        <button name="cancel" onClick={onCloseModal}> {translations[lang].cancelBtn} </button>
                        <button name="start" onClick={startGameMenu}> {translations[lang].startBtn} </button>
                        
                    </dialog>

                    <dialog className="pause-modal">    
                        <PauseMenu onClosePause={onClosePause} restart={restartGame} lang={lang} />
                    </dialog>

                    { !isWin ? <img src={mapBg} className={kidsMode ? "mapBg big" : "mapBg"} /> : ''}
                    <GameTable muteEffects={muteEffects} win={win} isWin={isWin} lang={lang} />
                    <div className="user-msg"></div>
                </section>



            </div>
        </div>   
    )
}