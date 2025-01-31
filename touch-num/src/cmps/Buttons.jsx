import { useSelector } from "react-redux";

export function Buttons({ startGameMenu, openPause}) {
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
              Options
            </button>
          ) : (
            <button
              name="start"
              type="button"
              onClick={startGameMenu}
              className="new-game-btn"
            >
              New Game
            </button>
          )}
        </section>
      )
    );
  }  