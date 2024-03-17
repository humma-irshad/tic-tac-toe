import { TTurns } from "../App";

interface ILogs {
  turns: TTurns[];
}

function Log({ turns }: ILogs) {
  return (
    <ol id="log">
      {turns.map(({ player, square }) => (
        <li
          key={`${square.row}${square.col}`}
        >{`Player ${player} selected row ${square.row} & column ${square.col}`}</li>
      ))}
    </ol>
  );
}

export default Log;
