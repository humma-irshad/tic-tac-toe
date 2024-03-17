import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import WINNING_COMBINATIONS from "../winning-combo";

export type TTurns = {
  square: { row: number; col: number };
  player: "X" | "O";
};

const INITIAL_GAMEBOARD = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function deriveActivePlayer(gameTurns: TTurns[]) {
  let currentPlayer: "X" | "O" = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState<TTurns[]>([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = [...INITIAL_GAMEBOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = "";

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column] as
      | "X"
      | "O";
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = playerName[firstSymbol];
    }
  }

  const matchDrawn = gameBoard.length === 9 && !winner;

  function handleActivePlayer(rowIdx: number, colIdx: number) {
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);

      const updatedTurns: TTurns[] = [
        { square: { row: rowIdx, col: colIdx }, player: activePlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol: string, newName: string) {
    setPlayerName((prevName) => {
      return { ...prevName, [symbol]: newName };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || matchDrawn) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
