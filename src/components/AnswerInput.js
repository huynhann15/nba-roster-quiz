import React, {useState, useMemo} from "react";
import Fuse from "fuse.js";
import './AnswerInput.css'

export default function AnswerInput({ input, setInput, handleGuess, disabled, players = [], resumeTimer}) {
    const[showHelp, setShowHelp] = useState(false);
    //creating fuse index
    //useMemo for player change
    const fuse = useMemo(
        () => new Fuse(players, {keys: ["playerName"], threshold:0.3}), //threshold: 0=strict, 1=loose
        [players]
        );
    //for resuming timer from typing name
    const handleChange = (e) => {
        const val = e.target.value;
        setInput(val);

        if (resumeTimer){
            resumeTimer();
        }

    const match = players.find((p) => {
        const parts = p.playerName.split(" ");
        const last = parts[parts.length - 1];
        return(
            val.toLowerCase() === last.toLowerCase() || val.toLowerCase() === p.playerName.toLowerCase()
        );
    });

    if (match){
        handleGuess({preventDefault: () => {} }, val);
        }
    };
    const suggestions =
        showHelp && input
        ? fuse.search(input).slice(0,1).map((r) => r.item.playerName)
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