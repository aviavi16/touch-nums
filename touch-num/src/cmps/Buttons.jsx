export function Buttons({ newGame, pauseGame, gameStarted, kidsMode }) {
    return (
      !kidsMode && (
        <section className="buttons-container">
          {gameStarted ? (
            <button
              name="pause"
              type="button"
              onClick={pauseGame}
              className="new-game-btn"
            >
              Options
            </button>
          ) : (
            <button
              name="start"
              type="button"
              onClick={newGame}
              className="new-game-btn"
            >
              New Game
            </button>
          )}
        </section>
      )
    );
  }  