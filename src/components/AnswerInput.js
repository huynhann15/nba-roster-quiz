import React, {useState, useMemo} from "react";
import Fuse from "fuse.js";

export default function AnswerInput({ input, setInput, handleGuess, disabled, players = []}) {
    const[showHelp, setShowHelp] = useState(false);
    //creating fuse index
    //useMemo for player change
    const fuse = useMemo(
        () => new Fuse(players, {keys: ["playerName"], threshold:0.3}),
        [players]
        );

    const suggestions =
        showHelp && input
        ? fuse.search(input).slice(0,1).map((r) => r.item.playerName)
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
      <button
        type="button"
        onClick={() => setShowHelp(!showHelp)}
        disabled={disabled}
        >
          {showHelp ? "Hide Spelling Help" : "Show Spelling Help"}
        </button>


      {showHelp && suggestions.length > 0 && (
        <ul className="suggestions">
            {suggestions.map((name, idx) => (
                <li
                  key={idx}
                  onClick={() => setInput(name)}
                  className="suggestion-item"
                  >
                    {name}
                  </li>
            ))}
        </ul>
      )}
    </div>
  );
}
