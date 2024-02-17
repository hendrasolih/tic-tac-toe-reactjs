import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from './components/GameOver.jsx';
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
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

function deriveWinner(gameBoard, players) {

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
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTruns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTruns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard
}

function App() {
 const [players, setPlayers] = useState(PLAYERS);
  const [gameTruns, setGameTruns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTruns);

  const gameBoard = deriveGameBoard(gameTruns);

  const winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTruns.length === 9;

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

  function handleRestart() {
    setGameTruns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });

  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} broad={gameBoard} />
      </div>
      <Log turns={gameTruns} />
    </main>
  );
}

export default App;
