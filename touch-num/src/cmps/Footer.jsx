import translations from "../translations.json";
export function Footer({ lang }){   
    return (
        <div className="title-container">
            <span className="title">{translations[lang].footer} </span>
        </div>
    )
}