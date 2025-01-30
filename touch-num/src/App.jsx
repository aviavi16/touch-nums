import { useEffect, useRef, useState } from "react";
import { Header } from "./cmps/Header";
import { MainPanel } from "./cmps/MainPanel";
import { Footer } from "./cmps/Footer";
import { InstructionsMenu } from "./cmps/InstructionsMenu";

export function App() {
    const [ kidsMode, setKidsMode ] = useState( false )
    const [ instructionsOpened, setInstructionsOpened ] = useState( false )

    function endKidsMode() {
        setKidsMode(false)
    }

    function startKidsMode(){
        setKidsMode(true)
    }

    function getWinTime(){
        console.log('timer:', timer)
        return timer
    }

        
    function closeInstructions(){
        setInstructionsOpened(false)
        document.querySelector('.instructions-modal').close()
    }

    function openInstructions(){
        setInstructionsOpened(true)
        const elName = document.querySelector('.instructions-modal')
        elName.showModal() 
    }

    function flashMsg(msg) {
        const el = document.querySelector('.user-msg')

        el.innerText = msg
        el.classList.add('open')
        setTimeout(() => el.classList.remove('open'), 3000)
    }

    return (
        <section className="app">
            <div className="header-container">
                <Header kidsMode={kidsMode} startKidsMode={startKidsMode} openInstructions={openInstructions}/>
            </div>

            <dialog className="instructions-modal">    
                <InstructionsMenu onCloseInstructions={closeInstructions}/>
            </dialog>
            <MainPanel startKidsMode={startKidsMode} endKidsMode={endKidsMode} kidsMode={kidsMode} instructionsOpened={instructionsOpened}/>            
            <Footer />
        </section>
        

    )
}