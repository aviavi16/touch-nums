import hint from "../imgs/hint.png"

export function Hint( { nextNum } ){
    return (
        <div className="hint-container">     
            <div className="timer-box">
                <img src={hint} className="image-hint"/>
            </div>        &nbsp; &nbsp;
            <div className="timer-box">
                <span> Next: </span>
			</div> &nbsp;
			<div className="colons"> <span> : </span></div>  &nbsp;
			<div className="timer-box">
                <div className="hint-wrapping"><div className="hint">{ nextNum } </div></div> 
			</div>
            
        </div>
    )
}