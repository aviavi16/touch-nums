import resumeBtn from "../imgs/resume-btn.webp"
import { CustomCheckbox } from "./CustomCheckbox"
export function PauseMenu({onClosePause, restart, onMuteEffects, onMuteSound} ){
    return (
        <section className="pause-menu-container">
            <div className="inner">
                <div className="pause-sub-menu-container">
                    <div className="pause-menu-title">
                        <button className="options-button">
                            OPTIONS
                        </button>
                    </div>
                    <div className="options-display-container">
                        <div className="pause-menu-music">
                            <span> Music </span>
                            <CustomCheckbox  onMute={onMuteSound} />
                        </div>
                        <div className="pause-menu-effects">
                            <span> Effects </span>
                            <CustomCheckbox onMute={onMuteEffects} />
                        </div>
                        <br/>
                        <div className="pause-menu-restart">
                            <button name="start" type="button" onClick={restart} className="restart-btn" >  Restart </button>
                        </div>
                    </div>
                    <div className="options-resume-container">
                        <div className="options-resume-sub-container">
                            <img  onClick={onClosePause} src={resumeBtn} height="2848" width="4288" className="resume-button" />
                        </div>
                    </div>
                    
                    {/* <button name="continue" onClick={onClosePause} className="resume-button"> Continue </button>  */}
                </div>
                {/* <img src={Bg} height="2848" width="4288" className="pause-menu-container-img" /> */}
            </div>
           
            

        </section>      
    )
}