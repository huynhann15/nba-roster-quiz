import React, {useMemo} from "react";
import Fuse from "fuse.js";

export default function AnswerInput({ input, setInput, handleGuess, disabled, players = []}) {
    //creating fuse index
    //useMemo for player change
    const fuse = useMemo(
        () => new Fuse(players, {keys: ["playerName"], threshold:0.4}),
        [players]
        );

    const suggestions =
        input.trim() && !disabled 
        ? fuse.search(input).slice(0,1)
        : [];

  return (
    <div className="answer-input-container">
    <form onSubmit={handleGuess} className="answer-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter player's last name"
        disabled={disabled}
        autoFocus
        autoComplete="off"
      />
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(({ item }) => (
            <li
              key={item.playerId}
              className="suggestion"
              onClick={() => setInput(item.playerName.split(" ").pop())}
            >
              {item.playerName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
