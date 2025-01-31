import EnglishFlag from "../imgs/english-flag.png";
import HebrewFlag from "../imgs/hebrew-flag.webp";

export function LanguageToggle({ lang, setLang }) {
    const toggleLanguage = () => {
        setLang((prevLang) => (prevLang === "en" ? "he" : "en"));
        document.documentElement.lang = lang === "en" ? "he" : "en"; // Change HTML lang attribute
    };

    return (
        <button onClick={toggleLanguage} className="flag-button">
            <img src={lang === "en" ? HebrewFlag : EnglishFlag} alt="Change Language" />
        </button>
    );
}
