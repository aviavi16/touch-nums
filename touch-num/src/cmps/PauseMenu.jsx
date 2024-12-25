import resumeBtn from "../imgs/resume-btn.webp"
export function PauseMenu({onClosePause } ){
    return (
        <section className="pause-menu-container">
            <div className="inner">
                <div className="pause-sub-menu-container">
                    <div className="pause-menu-title">
                        <div className="title-wrap">
                        Pause Menu
                        </div>
                    </div>
                    <img  onClick={onClosePause} src={resumeBtn} height="2848" width="4288" className="resume-button" />
                    {/* <button name="continue" onClick={onClosePause} className="resume-button"> Continue </button>  */}
                </div>
                {/* <img src={Bg} height="2848" width="4288" className="pause-menu-container-img" /> */}
            </div>
           
            

        </section>      
    )
}