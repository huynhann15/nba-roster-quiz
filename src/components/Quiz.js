import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Score from "./Score";
import AnswerInput from "./AnswerInput";
import RosterGrid from "./RosterGrid";

// shared header "pill" style (old .quiz-header .column)
const column =
  "float-left px-2 py-1 rounded bg-nba text-white font-helvetica shadow-[0_1px_3px_rgba(0,0,0,0.1)]";

// shared blue button look
const blueBtn = "bg-nba text-white border-0 cursor-pointer hover:bg-nba-hover";

export default function Quiz({
  selectedTeam,
  correct,
  setCorrect,
  input,
  setInput,
  handleGuess,
  setEnded,
  duration,
  teams,
  setElapsedTime,
  showHints,
  setShowHints
}) {
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [revealedAll, setRevealedAll] = useState(false);
  const [guessedNames, setGuessedNames] = useState([]);

  const handleGuessWithTracking = (e, name) => {
    const normalized = name.trim().toLowerCase();

    // prevent submitting the same full name again
    if (guessedNames.includes(normalized)) {
      return;
    }

    setGuessedNames((prev) => [...prev, normalized]);
    handleGuess(e, name);
  };

  const players =
    selectedTeam === "all"
      ? teams.flatMap((t) => t.players || [])
      : selectedTeam?.players || [];

  const totalPlayers = players.length;

  useEffect(() => {
    if (correct.length === totalPlayers) {
      setStopped(true);
      setEnded(true);
    }
  }, [correct, totalPlayers, setEnded]);

  const handleGiveUp = () => {
    setRevealedAll(true);
    setEnded(true);
    setStopped(true);
  };

  return (
    <div className="flex flex-col flex-wrap items-center w-full min-h-screen pt-20 bg-court bg-no-repeat bg-center bg-cover">
      {/* fixed header */}
      <div className="fixed top-0 left-0 z-[1000] flex flex-wrap items-center gap-[15px] w-full mr-[10px] text-white font-helvetica text-[1.38rem] font-bold">
        <div className={column}>
          <AnswerInput
            input={input}
            setInput={setInput}
            handleGuess={handleGuessWithTracking}
            guessedNames={guessedNames}
            disabled={stopped}
            players={players}
            resumeTimer={() => setPaused(false)}
          />
        </div>

        <div className={column}>
          <button
            onClick={() => setShowHints(!showHints)}
            className={`${blueBtn} text-[0.9rem] font-helvetica font-bold rounded-[3px] px-[5px] py-[3px]`}
          >
            {showHints ? 'Hide Hint (Jersey #)' : 'Show Hint (Jersey #)'}
          </button>
        </div>

        <div className={`${column} text-base`}>
          <Score correct={correct.length} total={totalPlayers} />
        </div>

        <div className={`${column} text-base`}>
          Timer:
          <Timer
            duration={duration}
            onTimeEnd={() => setEnded(true)}
            paused={paused}
            stopped={stopped}
            onTimeUpdate={setElapsedTime}
          />
        </div>

        {!stopped && (
          <div className={column}>
            <button
              onClick={() => setPaused(!paused)}
              className={`${blueBtn} text-[0.7rem] w-3 h-3 p-0 rounded`}
            >
              {paused ? "►" : "⏸"}
            </button>
          </div>
        )}

        {!stopped && (
          <div className={column}>
            <button
              onClick={handleGiveUp}
              className={`${blueBtn} text-[0.9rem] font-bold rounded-[5px] px-[10px] py-[6px]`}
            >
              Give Up?
            </button>
          </div>
        )}
      </div>

      <RosterGrid
        teams={teams}
        selectedTeam={
          selectedTeam === "all"
            ? "all"
            : typeof selectedTeam === "object"
            ? selectedTeam
            : teams.find((t) => t.team === selectedTeam) || null
        }
        correct={correct}
        revealedAll={revealedAll}
        showHints={showHints}
      />
    </div>
  );
}



