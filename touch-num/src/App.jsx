import { useRef, useState } from "react";
import { StopWatch } from "./cmps/StopWatch";
import { Victory } from "./cmps/Victory";


export function App() {
    const [ gameStarted, setGameStarted ] = useState( false )
    const [ timer, setTimer ] = useState( 0 )
    const [ nextNum , setNextNum ] = useState( 0 )
    let  _currentNumber = useRef(0)
    let  timeInterval = useRef(null)

    var gDifficulty = 'Easy'
    var gSize = 16;

    function startGame(){
        if (document.querySelector('.difficulty-container'))
            gDifficulty = document.querySelector('.difficulty-container').value;
        handleReset();

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
       
       const el = document.querySelector('.victory-container')
        el.classList.add('show')
    }

    function getWinTime(){
        console.log('timer:', timer)
        return timer
    }

    function openInstructions(){

    }

    function openPause(){
        const elName = document.querySelector('.pause-modal')
        elName.showModal() 
    }

    function onClosePause(){
        document.querySelector('.pause-modal').close()
        handleStart();
    }

    function openNew(){
        const elName = document.querySelector('.modal')
        elName.showModal()   
    }

    function onCloseModal() {
        document.querySelector('.modal').close()
    }

    function flashMsg(msg) {
        const el = document.querySelector('.user-msg')

        el.innerText = msg
        el.classList.add('open')
        setTimeout(() => el.classList.remove('open'), 3000)
    }


    const handleStart = () => {
        setGameStarted(true);
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 10);
    };

    const handlePause = () => {
        if (!gameStarted) return;
        openPause();
        setGameStarted(false);
        clearInterval(timeInterval.current);
    };
        
    const handleReset = () => {
        const el = document.querySelector('.victory-container.show')
        console.log('el:', el)
        if(el)
            el.className = 'victory-container';
        deleteOlderGame();
        setNextNum(0)
        setGameStarted(false);
        clearInterval(timeInterval.current);
        setTimer(0);
        _currentNumber.current = 0;
    };

    const handleTest = () => {
        const el = document.querySelector('.score')
        el.classList.add('show')

    };

    return (
        <section className="app-container">
                    <Victory getTime={timer} onReset={handleReset} onPause={handleTest}/> 

        <div className="header-container">
            <div className="title-container">
                <span className="title"> A game of learning and fun! </span>
            </div>
            
            <div className="links">
                <a onClick={openInstructions}> Instructions </a>
            </div>
        </div>

        <section className="table-container">
            <h1> Touch The Numbers: By Order ! </h1>
            <div className="buttons-watch-container">
                <div className="buttons-container">
                    <button name="start" type="button" onClick={openNew} className="new-game-btn" > New Game </button>
                    <button name="pause" type="button" onClick={handlePause} className="new-game-btn" > Pause Game </button>
                    <button name="quit" type="button" onClick={handleReset} className="new-game-btn" > Quit Game </button>
                </div>
                <div className="stop-watch-container">
                        <StopWatch time ={ timer }/>                 
                </div>
            </div>
            

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
                <button name="continue" onClick={onClosePause}> Continue </button>            
            </dialog>

            
            <span >     the next number is : {nextNum} </span>

            <div className="myDynamicTable"></div>
        </section>

        <div className="user-msg"></div>
        </section>
        

    )
}