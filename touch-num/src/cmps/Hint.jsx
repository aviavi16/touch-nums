export function Hint( { nextNum } ){
    return (
        <div className="hint-container">     
            <img src="/touch-nums/src/imgs/hint.png" className="image-hint"/>
            the next number is : {nextNum} 
        </div>
    )
}