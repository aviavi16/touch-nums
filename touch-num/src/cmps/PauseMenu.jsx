import resumeBtn from "../imgs/resume-btn.webp"
import { CustomCheckbox } from "./CustomCheckbox"
import translations from "../translations.json";

export function PauseMenu({onClosePause, restart, lang } ){

    return (
        <section className="pause-menu-container">
            <div className="inner">
                <div className="pause-sub-menu-container">
                    <div className="pause-menu-title">
                        <button className="options-button">
                            {translations[lang].menuTitle}
                        </button>
                    </div>
                    <div className="options-display-container">
                        <div className="pause-menu-music">
                            <span> {translations[lang].sound} </span>
                            <CustomCheckbox controll="sound" />
                        </div>
                        <div className="pause-menu-effects">
                            <span> {translations[lang].effects} </span>
                            <CustomCheckbox controll="effects" />
                        </div>
                        <br/>
                        <div className="pause-menu-restart">
                            <button name="start" type="button" onClick={restart} className="restart-btn" >  {translations[lang].restart} </button>
                        </div>
                    </div>
                    <div className="options-resume-container">
                        <div className="options-resume-sub-container">
                            <button className="options-resume-button" onClick={onClosePause}>
                                {translations[lang].resumeBtn}
                            </button>
                            {/* <img  onClick={onClosePause} src={resumeBtn} height="2848" width="4288" className="resume-button" /> */}
                        </div>
                    </div>
                    
                    {/* <button name="continue" onClick={onClosePause} className="resume-button"> Continue </button>  */}
                </div>
                {/* <img src={Bg} height="2848" width="4288" className="pause-menu-container-img" /> */}
            </div>
           
            

        </section>      
    )
}