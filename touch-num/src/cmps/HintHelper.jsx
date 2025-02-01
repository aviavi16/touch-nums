import translations from "../translations.json";

export function HintHelper({ nextNum, lang }){
    return(
        <>
            <div className="timer-box">
                { lang === "en" ? <span>{translations[lang].hint}</span> : (<div className="hint-wrapping"><div className="hint"> {nextNum}  </div></div> )} 
            </div> &nbsp;
            <div className="colons"> <span> : </span></div> &nbsp;
            <div className="timer-box">
                { lang === "en" ? (<div className="hint-wrapping"><div className="hint"> {nextNum}  </div></div> ): <span> {translations[lang].hint}</span>} 
            </div>
        </>
       
    )
}