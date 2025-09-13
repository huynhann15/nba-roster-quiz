import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import './AnswerInput.css';

export default function AnswerInput({ input, setInput, handleGuess, disabled, players = [], resumeTimer, guessedNames }) {
  const [showHelp, setShowHelp] = useState(false);

  //use fuse.js for suggestions
  const fuse = useMemo(
    () => new Fuse(players, { keys: ["playerName"], threshold: 0.4 }),
    [players]
  );

  const handleChange = (e) => {
    const val = e.target.value.trim();
    setInput(val);

    if (resumeTimer) {
      resumeTimer();
    }

    const inputLower = val.toLowerCase();

    //blocking for duplicate exact matches
    const alreadyGuessed = guessedNames.some(
      (name) => name.toLowerCase() === inputLower
    );

    if (alreadyGuessed) {
      return;
    }

    const exactMatch = players.find((p) => {
      const full = p.playerName.toLowerCase();
      const last = p.playerName.split(" ").slice(-1)[0].toLowerCase();
      return inputLower === full || inputLower === last;
    });

    if (exactMatch) {
      handleGuess({ preventDefault: () => {} }, val);
    }
  };

  const suggestions =
    showHelp && input
      ? fuse.search(input).slice(0, 1).map((r) => r.item.playerName)
      : [];

  return (
    <div className="answer-input-container">
      <div className="input-w-helper">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter player name/last name"
          disabled={disabled}
          autoFocus
          autoComplete="off"
        />
        <button
          type="button"
          className="spelling-help-btn"
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
    </div>
  );
}
