import { useRef, useState } from "react";
import { StopWatch } from "../cmps/StopWatch";


export function App() {
    const [ gameStarted, setGameStarted ] = useState( false )
    const [ timer, setTimer ] = useState( 0 )
    const [ nextNum , setNextNum ] = useState( 0 )

    let  timeInterval = useRef(null)

    var gDifficulty = 'Easy'

    function startGame(){
        if (document.querySelector('.difficulty-container'))
            gDifficulty = document.querySelector('.difficulty-container').value;
        deleteOlderGame();
        handleReset();

        var size = 0;
        console.log('gDifficulty:', gDifficulty)
        switch (gDifficulty){
            case 'Medium':
                size = 25;
                break;
            case 'Hard':
                size = 36;
                break;
            case 'Easy': 
            default:
                size = 16;
                break;
        }
        console.log('gDifficulty:', size)
    
        var div = document.querySelector('.myDynamicTable');
        var table = document.createElement('table');
        table.className= 'table';
        var tableBody = document.createElement('tbody');
        var numberOfRowCols = Math.sqrt(size);
    
        var allNums = Array(size).fill().map((_, i) => i * 1);
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
        console.log('cell:', cell)
        cell.className += ' choose';
    }

    function openInstructions(){

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
        setTimer(0);
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 10);
    };

    const handlePause = () => {
        if (!gameStarted) return;
        setGameStarted(false);
        clearInterval(timeInterval.current);
    };
        
    const handleReset = () => {
        setGameStarted(false);
        clearInterval(timeInterval.current);
        setTimer(0);
    };


    return (
        <section className="app-container">
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
            <button type="button" onClick={openNew} className="new-game-btn" > New Game </button>
            
            <dialog className="modal">
                <h3> Please Select Difficulty: </h3>
                <select  
                    className="difficulty-container"
                >  
                <option value="Easy"> Easy </option>
                <option value="Medium"> Medium </option>
                <option value="Hard"> Hard </option>


                </select>


                <button onClick={onCloseModal}> Cancel </button>
                <button onClick={startGame}> Start </button>
                
            </dialog>

            <StopWatch time ={ timer }/>
            <span >     the next number is : {nextNum} </span>

            <div className="myDynamicTable"></div>
        </section>

        <div className="user-msg"></div>
        </section>
        

    )
}