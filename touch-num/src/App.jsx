import { useEffect, useRef, useState } from "react";
import { Header } from "./cmps/Header";
import { MainPanel } from "./cmps/MainPanel";
import { Footer } from "./cmps/Footer";

export function App() {
    const [ kidsMode, setKidsMode ] = useState( false )

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

    function openInstructions(){
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

            <MainPanel startKidsMode={startKidsMode} endKidsMode={endKidsMode} kidsMode={kidsMode} openInstructions={openInstructions}/>            
            <Footer />
        </section>
        

    )
}