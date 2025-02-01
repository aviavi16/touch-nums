import { useSelector } from "react-redux";
import translations from "../translations.json";

export function Buttons({ startGameMenu, openPause, lang}) {
  const kidsMode = useSelector((state) => state.kidsMode);
  const gameStarted = useSelector((state) => state.gameStarted); // ✅ Correct

  return (
      !kidsMode && (
        <section className="buttons-container">
          {gameStarted ? (
            <button
              name="pause"
              type="button"
              onClick={openPause}
              className="new-game-btn"
            >
              {translations[lang].options}
              
            </button>
          ) : (
            <button
              name="start"
              type="button"
              onClick={startGameMenu}
              className="new-game-btn"
            >
              {translations[lang].start}
              
            </button>
          )}
        </section>
      )
    );
  }  