import { ChangeEvent, useState } from "react";

interface IPlayer {
  initialName: string;
  symbol: string;
  isActive: boolean;
  onNameChange: (symbol: string, newName: string) => void;
}

function Player({ initialName, symbol, isActive, onNameChange }: IPlayer) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState(initialName);

  function handleEditPlayer() {
    setIsEditing((prevState) => !prevState);

    if (isEditing) {
      onNameChange(symbol, inputName);
    }
  }

  function handleInputNameChange(event: ChangeEvent<HTMLInputElement>) {
    setInputName(event.target.value);
  }

  let playerName = <span className="player-name">{inputName}</span>;
  if (isEditing) {
    playerName = (
      <input
        className="player-name"
        type="text"
        value={inputName}
        onChange={handleInputNameChange}
        required
      />
    );
  }

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
          <button onClick={handleEditPlayer}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </span>
      </li>
    </>
  );
}

export default Player;
