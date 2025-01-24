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

    const [ nextNum , setNextNum ] = useState( 0 )
    const [ timer, setTimer ] = useState( 0 )
    let  _currentNumber = useRef(0)
    let  timeInterval = useRef(null)

    useEffect(()=>{
        openInstructions()
    }, [])
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
        const buttonsEl = document.querySelector('.buttons-container')
        buttonsEl.classList.add('hide')
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
                break;
            case 'Hard':
                gSize = 36;
                break;
            case 'Easy': 
            default:
                gSize = 16;
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
        const el = document.querySelector('.victory-container.show')
        const buttonsEl = document.querySelector('.buttons-container.hide')
        if(el){
            el.className = 'victory-container';
            buttonsEl.className = 'buttons-container';
        }
           
        deleteOlderGame();
        setNextNum(0)
        setGameStarted(false);
        clearInterval(timeInterval.current);
        setTimer(0);
        _currentNumber.current = 0;

        if(kidsMode){
            const buttonsEl = document.querySelector('.buttons-container')
            buttonsEl.classList.add('hide')
            gDifficulty = 'Easy'
            startGame()
            const tableEl = document.querySelector('.table')
            tableEl.classList.add('big')
        }
        const hintEl = document.querySelector('.hint-container')
        if(hintEl) hintEl.style.display = 'none';
        
        const timerEl = document.querySelector('.stop-watch')
        if(timerEl) timerEl.style.display = 'none';
        
    }

    const handleTest = () => {
        const el = document.querySelector('.score')
        el.classList.add('show')

    }

    function KidsModeOff() {
        endKidsMode()
        const buttonsEl = document.querySelector('.buttons-container.hide')
        if(buttonsEl) buttonsEl.className = 'buttons-container';
        const hintEl = document.querySelector('.hint-container.kids')
        if(hintEl){
            hintEl.className = 'hint-container';
            hintEl.style.display = 'none';
        } 
        const timerEl = document.querySelector('.stop-watch.hide')
        if(timerEl){
            timerEl.className = 'stop-watch';
            timerEl.style.display = 'none';
        } 
        deleteOlderGame();
        setNextNum(0)
        setGameStarted(false);
        clearInterval(timeInterval.current);
        setTimer(0);
        _currentNumber.current = 0;
    }

    function KidsModeOn() {
        startKidsMode()
        const buttonsEl = document.querySelector('.buttons-container')
        if(buttonsEl) buttonsEl.classList.add('hide')
        const hintEl = document.querySelector('.hint-container')
        hintEl.classList.add('kids')
        if (document.querySelector('.difficulty-container')) document.querySelector('.difficulty-container').value = 'Easy';
        startGame()
        const timerEl = document.querySelector('.stop-watch')
        if(timerEl) timerEl.style.display = 'none';
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
                <div className="display-panel-container">
                    {gameStarted &&  (<Hint className="hint-container" nextNum={nextNum}/>)}
                    <Buttons newGame={openNew} pauseGame={handlePause} quitGame={handleReset} gameStarted={gameStarted}/>
                    {gameStarted &&  (<StopWatch time={timer}/>)}
                </div>
                    
                </div>
                {/* <div className="display-panel-container">
                    <div className="stop-watch-container">
                        
                        {kidsMode && ( 
                            <img className="adult-mode-image" onClick={KidsModeOff} 
                                src={adultMode}/>)
                        }
                                   
                        
                    </div>
                    
                </div> */}

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
                        <PauseMenu onClosePause={onClosePause}/>
                    </dialog>

                    <dialog className="instructions-modal">    
                        <InstructionsMenu onCloseInstructions={onCloseInstructions}/>
                    </dialog>

                    { !isWin ? <img src={mapBg} className="mapBg"></img> : ''}
                    { !isWin ? <div className="myDynamicTable"></div> : ''}
                    <div className="user-msg"></div>
                </section>



            </div>
        </div>   
    )
}