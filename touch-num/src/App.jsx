import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pauseGame, resumeGame } from "./store/game/game.reducer";
import { Header } from "./cmps/Header";
import { MainPanel } from "./cmps/MainPanel";
import { Footer } from "./cmps/Footer";
import { InstructionsMenu } from "./cmps/InstructionsMenu";
import { LanguageToggle } from "./cmps/LanguageToggle";
import translations from "./translations.json";
import sound from "./sounds/sound2.mp3";

export function App() {
    const muteSound = useSelector((state) => state.muteSound);
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const [lang, setLang] = useState("en"); 
    const [isPlaying, setIsPlaying] = useState(false); 

    useEffect(() => {
        onMuteSound();
    }, [muteSound]);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.play().catch(err => console.error("Audio play error:", err));
        }
    }, [isPlaying]);

    function onMuteSound() {
        if (audioRef.current) {
            audioRef.current.muted = muteSound;
        }
    }

    function handleUserInteraction() {
        if (!isPlaying) {
            setIsPlaying(true);
        }
    }

    function closeInstructions() {
        dispatch(resumeGame());
        document.querySelector(".instructions-modal").close();
    }

    function openInstructions() {
        dispatch(pauseGame());
        document.querySelector(".instructions-modal").showModal();
    }

    function flashMsg(msg) {
        const el = document.querySelector(".user-msg");
        el.innerText = msg;
        el.classList.add("open");
        setTimeout(() => el.classList.remove("open"), 3000);
    }

    return (
        <section className="app" onClick={handleUserInteraction}>
            <audio ref={audioRef} src={sound} loop />
            <div className="header-container">
                <Header openInstructions={openInstructions} lang={lang} setLang={setLang} />
            </div>

            <dialog className="instructions-modal">
                <InstructionsMenu onCloseInstructions={closeInstructions} lang={lang} />
            </dialog>

            <MainPanel lang={lang} />
            <Footer lang={lang} />
            {!isPlaying && <button onClick={handleUserInteraction}>Click to Play Sound</button>}
        </section>
    );
}
