import woodenBg from "../imgs/woodenBg.jpg"
export function PauseMenu({onClosePause } ){
    return (
        <section className="pause-menu-container">
            <div className="inner">
                <div className="pause-sub-menu-container">
                    <div className="pause-menu-title">
                        Pause Menu
                    </div>
                    <button name="continue" onClick={onClosePause}> Continue </button> 
                </div>
                <img src={woodenBg} height="2848" width="4288" className="img" />
            </div>
           
            

        </section>      
    )
}