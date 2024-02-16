import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTruns, setGameTruns] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);

  const activePlayer = deriveActivePlayer(gameTruns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTruns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    console.log(firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol);
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol &&
      thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTruns((prevTruns) => {
      const currentActivePlayer = deriveActivePlayer(prevTruns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentActivePlayer,
        },
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
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} broad={gameBoard} />
      </div>
      <Log turns={gameTruns} />
    </main>
  );
}

export default App;
