import resumeBtn from "../imgs/resume-btn.webp"
import kidMode from "../imgs/kidsMode.png"
import adultMode from "../imgs/adultMode.jfif"
import instructionsGif from '../imgs/instructions-gif.gif'
import translations from "../translations.json";

export function InstructionsMenu({onCloseInstructions ,lang } ){
    return (
        <section className="instructions-menu-container">
                <div className="instructions-sub-menu-container">
                    <div className="instructions-menu-title">
                        <div className="title-wrap">
                            {translations[lang].instructionsDesc}
                            <p className="how-to-play-description">
                                {translations[lang].instructionsTxt1}   
                                <br/>
                            </p>
                            <img className="instructions-gif" src={instructionsGif}/>
                            <p className="how-to-play-description">
                                {translations[lang].instructionsTxt2}
                                <br/>
                                {translations[lang].instructionsTxt3}
                            </p>
                            <p className="how-to-play-description-ps">
                                {translations[lang].instructionsTxt4}
                                <br/>
                                {translations[lang].instructionsTxt5}
                                <br/>
                                {translations[lang].instructionsTxt6}
                            </p>
                            <div className="instructions-images">
                                <img className="instructions-image" src={kidMode}/>
                                <img className="instructions-image" src={adultMode}/>
                            </div>
                           
                        </div>
                    </div>
                    <img  onClick={onCloseInstructions} src={resumeBtn} height="2848" width="4288" className="resume-instructions-button" />
                </div>

        </section>      
    )
}