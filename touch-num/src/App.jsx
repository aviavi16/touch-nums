import { Header } from "./cmps/Header";
import { MainPanel } from "./cmps/MainPanel";
import { Footer } from "./cmps/Footer";
import { InstructionsMenu } from "./cmps/InstructionsMenu";
import { useDispatch } from "react-redux";
import { pauseGame, resumeGame } from "./store/game/game.reducer";

export function App() {
    const dispatch = useDispatch(); // Redux dispatcher


  
    function getWinTime(){
        console.log('timer:', timer)
        return timer
    }

        
    function closeInstructions(){
        dispatch(resumeGame())
        document.querySelector('.instructions-modal').close()
    }

    function openInstructions(){
        dispatch(pauseGame())
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
                <Header openInstructions={openInstructions}/>
            </div>

            <dialog className="instructions-modal">    
                <InstructionsMenu onCloseInstructions={closeInstructions}/>
            </dialog>
            <MainPanel />            
            <Footer />
        </section>
        

    )
}