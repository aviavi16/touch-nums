export function Hint( { nextNum } ){
    return (
        <div className="hint-container">     
            <img src="/touch-nums/src/imgs/hint.png" className="image-hint"/>
            <span> the next number is :</span> <div className="hint-wrapping"><div className="hint">{nextNum} </div></div> 
        </div>
    )
}