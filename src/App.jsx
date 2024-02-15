import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { useState } from "react";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTruns, setGameTruns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTruns)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTruns((prevTruns) => {
      const currentActivePlayer = deriveActivePlayer(prevTruns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentActivePlayer },
        ...prevTruns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTruns} />
      </div>
      <Log turns={gameTruns} />
    </main>
  );
}

export default App;
