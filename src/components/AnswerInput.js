import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import './AnswerInput.css';

export default function AnswerInput({
  input,
  setInput,
  handleGuess,
  disabled,
  players = [],
  resumeTimer,
  guessedNames,
}) {
  const [showHelp, setShowHelp] = useState(false);
  //fuse.js for spelling help
  const fuse = useMemo(
    () => new Fuse(players, { keys: ["playerName"], threshold: 0.4 }),
    [players]
  );

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (resumeTimer) resumeTimer();

    const inputTrimmed = val.trim();
    const inputLower = inputTrimmed.toLowerCase();

    // match players by full name or last name
    const matchingPlayers = players.filter((p) => {
      const fullName = p.playerName.toLowerCase();
      const lastName = p.playerName.split(" ").pop().toLowerCase();
      return inputLower === fullName || inputLower === lastName;
    });

    // remove already-guessed players
    const unguessedMatches = matchingPlayers.filter((p) => {
      return !guessedNames.some(
        (guessed) => guessed.toLowerCase() === p.playerName.toLowerCase()
      );
    });

    if (unguessedMatches.length === 0) return;

    unguessedMatches.forEach((p) => {
      handleGuess({ preventDefault: () => {} }, p.playerName);
    });

    setInput(""); // clear after guessing
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
