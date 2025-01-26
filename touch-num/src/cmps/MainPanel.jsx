import { Buttons } from "./Buttons";
import { Hint } from "./Hint";
import { StopWatch } from "./StopWatch";
import { PauseMenu } from "./PauseMenu";
import adultMode from "../imgs/adultMode.jfif"
import { InstructionsMenu } from "./InstructionsMenu";
import { useEffect, useRef, useState } from "react";
import { Victory } from "./Victory";
import kidMode from "../imgs/kidsMode.png"
import mapBg from "../imgs/map.png"

export function MainPanel({ kidsMode, startKidsMode, endKidsMode, openInstructions}){
    const [ gameStarted, setGameStarted ] = useState( false )
    const [ isWin, setIsWin ] = useState( false )
    const[ isNewGame, setIsNewGame ] = useState( true )
    const [ nextNum , setNextNum ] = useState( 0 )
    const [ timer, setTimer ] = useState( 0 )
    let  _currentNumber = useRef(0)
    let  timeInterval = useRef(null)
    const [ tableSize, setTableSize] = useState(16)


    useEffect(() => {
        // Set the CSS variable
        document.documentElement.style.setProperty("--my-size", Math.sqrt(tableSize) );
    }, [tableSize]);

    var gDifficulty = 'Easy'
    var gSize = 16;

    function shuffleArray(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function deleteOlderGame(){
        var div = document.querySelector('.myDynamicTable');
        if (div)
            div.innerHTML = ''
    
    }

    function choose(cell){
        console.log('cell.innerText:', cell.innerText + " " + _currentNumber.current)
        if (parseInt(cell.innerText) === _currentNumber.current)
            success()
        else
            return
        cell.className += ' choose';
        return
    }

    function success(){
        console.log('success:')
        _currentNumber.current++;
        if ( _currentNumber.current === gSize) 
            win()

        setNextNum (prev => prev + 1)
    }

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
        if (!gameStarted) return;
        openPause();
        setGameStarted(false);
        clearInterval(timeInterval.current);
    }

    function startGame(){
        // if( isNewGame){
        //     setIsNewGame(false)
        //     openInstructions()
        // } 
        if (document.querySelector('.difficulty-container'))
            gDifficulty = document.querySelector('.difficulty-container').value;
        deleteOlderGame();
        setNextNum(0)
        setGameStarted(false);
        clearInterval(timeInterval.current);
        setTimer(0);
        _currentNumber.current = 0;

        console.log('gDifficulty:', gDifficulty)
        switch (gDifficulty){
            case 'Medium':
                gSize = 25;
                setTableSize(25)
                break;
            case 'Hard':
                gSize = 36;
                setTableSize(36)
                break;
            case 'Easy': 
            default:
                gSize = 16;
                setTableSize(16)
                break;
        }
        console.log('gDifficulty:', gSize)
    
        var div = document.querySelector('.myDynamicTable');
        var table = document.createElement('table');
        table.className= 'table';
        var tableBody = document.createElement('tbody');
        var numberOfRowCols = Math.sqrt(gSize);
    
        var allNums = Array(gSize).fill().map((_, i) => i * 1);
        shuffleArray(allNums);
    
        for (var i = 0; i < numberOfRowCols; i++) {
            var tr = document.createElement('tr');
            tableBody.appendChild(  tr   );
            for (var j = 0; j < numberOfRowCols; j++) {
                var td =  document.createElement('td');
                td.className = 'td';
                td.onclick =  function (evt) { choose(this); }
                var span = document.createElement('span');
    
                span.innerText =  allNums.pop();
                td.appendChild(span) 
                    tr.appendChild(  td     ) ;
            }
        }
        table.appendChild (tableBody);
        div.appendChild (table);
        handleStart();
        onCloseModal();
    }

    const handleStart = () => {
        setGameStarted(true);
        timeInterval.current = setInterval(() => {
            setTimer((timer) => timer + 10);
        }, 10);
    }

    function restartGame(){
        //promt?
        deleteOlderGame();
        setNextNum(0)
        setGameStarted(false);
        clearInterval(timeInterval.current);
        setTimer(0);
        _currentNumber.current = 0;
        onClosePause()
        openNew()
    }
    
    function onCloseInstructions(){
        document.querySelector('.instructions-modal').close()
    }

    function openPause(){
        const elName = document.querySelector('.pause-modal')
        elName.showModal() 
    }

    function onClosePause(){
        document.querySelector('.pause-modal').close()
        handleStart();
    }

    function onCloseModal() {
        document.querySelector('.modal').close()
    }

    const handleReset = () => {
        setIsWin(false)
        const el = document.querySelector('.victory-container.show')
        if(el){
            el.className = 'victory-container';
        }
           
        deleteOlderGame();
        setNextNum(0)
        setGameStarted(false);
        clearInterval(timeInterval.current);
        setTimer(0);
        _currentNumber.current = 0;

        if(kidsMode){
            gDifficulty = 'Easy'
            startGame()
            const tableEl = document.querySelector('.table')
            tableEl.classList.add('big')
        }       
    }

    const handleTest = () => {
        const el = document.querySelector('.score')
        el.classList.add('show')

    }

    function KidsModeOff() {
        endKidsMode()
        deleteOlderGame();
        setNextNum(0)
        setGameStarted(false);
        clearInterval(timeInterval.current);
        setTimer(0);
        _currentNumber.current = 0;
    }

    function KidsModeOn() {
        startKidsMode()
        if (document.querySelector('.difficulty-container')) document.querySelector('.difficulty-container').value = 'Easy';
        startGame()
        const tableEl = document.querySelector('.table')
        tableEl.classList.add('big')
    }
    
    function blink(){
        const element = document.querySelector('.blinking-element');
        element.classList.toggle('blink'); // Toggles the blink animation
    }
    
    return (
        <div className="app-bg-container">
            <Victory getTime={timer} onReset={handleReset} onPause={handleTest}/> 
            
            {/* <div class="blinking-element">Blink Me!</div>
            <button id="blink-button" onClick={blink}>Start Blinking</button> */}
            <div className="app-container">
                <div className="buttons-watch-container">
                {!kidsMode && ( 
                    <div className="kids-icon-container">
                        <img className="kids-mode-image" onClick={KidsModeOn}  src={kidMode}/> 
                    </div>)
                }
                <div className={kidsMode ? "display-panel-container kids" : "display-panel-container"}>
                    {kidsMode && ( 
                        <div className="adult-icon-container">
                            <img className="adult-mode-image" onClick={KidsModeOff}  src={adultMode}/> 
                        </div>)
                    }
                    {gameStarted &&  (<Hint className="hint-container" nextNum={nextNum} kidsMode={kidsMode}/>)}
                    <Buttons newGame={openNew} pauseGame={handlePause} quitGame={handleReset} gameStarted={gameStarted} kidsMode={kidsMode}/>
                    {gameStarted && (<StopWatch time={timer} kidsMode={kidsMode }/>)}
                </div>
                    
                </div>

                <section className="table-container">
                    <dialog className="modal">
                        <h3> Please Select Difficulty: </h3>
                        <select  
                            className="difficulty-container"
                            name="difficulty"
                        >  
                        <option value="Easy"> Easy </option>
                        <option value="Medium"> Medium </option>
                        <option value="Hard"> Hard </option>


                        </select>
                    

                        <button name="cancel" onClick={onCloseModal}> Cancel </button>
                        <button name="start" onClick={startGame}> Start </button>
                        
                    </dialog>

                    <dialog className="pause-modal">    
                        <PauseMenu onClosePause={onClosePause} restart={restartGame}/>
                    </dialog>

                    <dialog className="instructions-modal">    
                        <InstructionsMenu onCloseInstructions={onCloseInstructions}/>
                    </dialog>

                    { !isWin ? <img src={mapBg} className={kidsMode ? "mapBg big" : "mapBg"} /> : ''}
                    { !isWin ? <div className="myDynamicTable"></div> : ''}
                    <div className="user-msg"></div>
                </section>



            </div>
        </div>   
    )
}