interface IGameOver {
  winner: string;
  onRestart: () => void;
}

function GameOver({ winner, onRestart }: IGameOver) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} won</p>}
      {!winner && <p>Match drawn</p>}
      <button onClick={onRestart}>Rematch</button>
    </div>
  );
}

export default GameOver;
