import { LanguageToggle } from "./LanguageToggle";
import translations from "../translations.json";

export function Header({ openInstructions, lang, setLang }) {
    return (
        <div className="header-bg-container">
            <div className="header-sub-container">
                <LanguageToggle lang={lang} setLang={setLang} />
                <button name="start" type="button" onClick={openInstructions} className="instructions-btn">
                    {translations[lang].instructionsTitle}
                </button>
            </div>
        </div>
    );
}
