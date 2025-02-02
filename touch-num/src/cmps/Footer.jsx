import translations from "../translations.json";
export function Footer({ lang }){   
    return (
        <div className={ lang === "he" ? "title-heb-container" : "title-eng-container" }>
            <span className="title">{ translations[lang].footer} </span>
        </div>
    )
}