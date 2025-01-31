import { Header } from "./cmps/Header";
import { MainPanel } from "./cmps/MainPanel";
import { Footer } from "./cmps/Footer";
import { InstructionsMenu } from "./cmps/InstructionsMenu";
import { useDispatch, useSelector } from "react-redux";
import { pauseGame, resumeGame } from "./store/game/game.reducer";
import sound from "./sounds/sound2.mp3"; 
import { useEffect, useRef } from "react";

export function App() {
    const muteSound = useSelector((state) => state.muteSound);

    const dispatch = useDispatch(); // Redux dispatcher
    const audioRef = useRef(null);

    useEffect(() => {
        onMuteSound()
    }, [muteSound]); // Play when the component mounts

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.play();
        }
    }, []); // Play when the component mounts


  
    // Function to mute/unmute sound
    function onMuteSound() {
        if (audioRef.current) {
            audioRef.current.muted = muteSound;
        }
    }

    // // Function to mute/unmute sound
    // function onResumeSound() {
    //     console.log('here2')
    //     if (audioRef.current) {
    //         audioRef.current.muted = muteSound;
    //     }
    // }

    
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
            <audio ref={audioRef} src={sound} loop autoPlay />
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