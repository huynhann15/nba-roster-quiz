import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";

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
    <div>
      {/* input + spelling help row */}
      <div className="relative flex flex-row items-center gap-[5px] text-[0.9rem] max-[600px]:flex-nowrap max-[600px]:gap-[6px]">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter player name/last name"
          disabled={disabled}
          autoFocus
          autoComplete="off"
          className="flex-[0_0_200px] w-[250px] p-[6px] text-[0.89rem] rounded-md border-0 bg-nba-mist text-nba
                     max-[600px]:w-auto max-[600px]:flex-[1_1_auto] max-[600px]:min-w-0 max-[600px]:text-[0.85rem] max-[600px]:p-[5px]"
        />
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          disabled={disabled}
          className="flex-none bg-nba text-white font-bold border-0 rounded-md hover:bg-nba-hover
                     max-[600px]:text-[0.85rem] max-[600px]:px-2 max-[600px]:py-[5px] max-[600px]:whitespace-nowrap"
        >
          {showHelp ? "Hide Spelling Help" : "Show Spelling Help"}
        </button>

        {/* spelling help dropdown */}
        {showHelp && suggestions.length > 0 && (
          <ul
            className="absolute top-full left-0 z-10 w-full mt-1 p-0 list-none bg-white
                       border border-solid border-[#ccc] rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.1)]
                       max-h-[150px] overflow-y-auto max-[600px]:max-h-[120px]"
          >
            {suggestions.map((name, idx) => (
              <li
                key={idx}
                onClick={() => setInput(name)}
                className="px-[10px] py-2 cursor-pointer text-nba hover:bg-nba-mist"
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