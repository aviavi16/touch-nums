import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pauseGame, resumeGame } from "./store/game/game.reducer";
import { Header } from "./cmps/Header";
import { MainPanel } from "./cmps/MainPanel";
import { Footer } from "./cmps/Footer";
import { InstructionsMenu } from "./cmps/InstructionsMenu";
import sound from "./sounds/sound2.mp3";

export function App() {
    const muteSound = useSelector((state) => state.muteSound);
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const [lang, setLang] = useState("en");
    const [userInteracted, setUserInteracted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = true; // Start muted so autoplay works
        audio.play().catch(err => console.error("Autoplay blocked:", err));
    }, []);

    function handleUserInteraction(event) {
        if (userInteracted) return; // Ignore if already interacted

        const clickedMuteButton = event.target.closest(".mute-button"); // Check if mute button was clicked

        setUserInteracted(true);

        if (!clickedMuteButton && audioRef.current) {
            audioRef.current.muted = muteSound; // Unmute if first interaction wasn't the mute button
            audioRef.current.play().catch(err => console.error("Audio play error:", err));
        }
    }

    useEffect(() => {
        if (userInteracted && audioRef.current) {
            audioRef.current.muted = muteSound;
        }
    }, [muteSound, userInteracted]);

    function closeInstructions() {
        dispatch(resumeGame());
        document.querySelector(".instructions-modal").close();
    }

    function openInstructions() {
        dispatch(pauseGame());
        document.querySelector(".instructions-modal").showModal();
    }

    return (
        <section className="app" onClick={handleUserInteraction}>
            <audio ref={audioRef} src={sound} loop muted autoPlay />
            <div className="header-container">
                <Header openInstructions={openInstructions} lang={lang} setLang={setLang} />
            </div>

            <dialog className="instructions-modal">
                <InstructionsMenu onCloseInstructions={closeInstructions} lang={lang} />
            </dialog>

            <MainPanel lang={lang} isMute={muteSound} userInteracted={userInteracted} />
            <Footer lang={lang} />
        </section>
    );
}
