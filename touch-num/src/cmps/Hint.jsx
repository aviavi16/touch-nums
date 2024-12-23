import hint from "../imgs/hint.png"

export function Hint( { nextNum } ){
    return (
        <div className="hint-container">     
            <img src={hint} className="image-hint"/>
            <span> the next number is :</span> <div className="hint-wrapping"><div className="hint">{nextNum} </div></div> 
        </div>
    )
}