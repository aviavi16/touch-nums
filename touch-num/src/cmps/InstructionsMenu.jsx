import resumeBtn from "../imgs/resume-btn.webp"
import kidMode from "../imgs/kidsMode.png"
import adultMode from "../imgs/adultMode.jfif"
import instructionsGif from '../imgs/instructions-gif.gif'

export function InstructionsMenu({onCloseInstructions } ){
    return (
        <section className="instructions-menu-container">
                <div className="instructions-sub-menu-container">
                    <div className="instructions-menu-title">
                        <div className="title-wrap">
                            How to Play:
                            <p className="how-to-play-description">
                                You will need to click the numbers by the right order.
                                <br/>
                            </p>
                            <img className="instructions-gif" src={instructionsGif}/>
                            <p className="how-to-play-description">
                                The faster you do, the better the score!
                                <br/>
                                good luck!
                            </p>
                            <p className="how-to-play-description-ps">
                                p.s
                                <br/>
                                for kid's mode, click the icon on top.
                            </p>
                            <p className="how-to-play-description-ps"> 
                                to go back, click the adult mode icon.
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