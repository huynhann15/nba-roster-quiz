import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Score from "./Score";
import AnswerInput from "./AnswerInput";
import RosterGrid from "./RosterGrid";

// shared header "pill" style (old .quiz-header .column)
const column =
  "float-left px-2 py-1 rounded bg-nba text-white font-helvetica shadow-[0_1px_3px_rgba(0,0,0,0.1)] box-border";

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
    <div className="flex flex-col flex-wrap items-center w-full min-h-screen pt-20 bg-court bg-no-repeat bg-center bg-cover max-[768px]:pt-0">
      {/* header: fixed on desktop; on mobile it becomes a sticky blue bar that takes up real space,
          so however many rows it wraps to, the board starts below it instead of underneath it */}
      <div
        className="fixed top-0 left-0 z-[1000] flex flex-wrap items-center gap-[15px] w-full mr-[10px] text-white font-helvetica text-[1.38rem] font-bold
                   max-[768px]:sticky max-[768px]:mr-0 max-[768px]:gap-2 max-[768px]:p-2 max-[768px]:box-border
                   max-[768px]:bg-nba max-[768px]:shadow-md max-[768px]:text-base"
      >
        {/* input gets its own full-width row on phones */}
        <div className={`${column} max-[600px]:basis-full`}>
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
            className={`${blueBtn} text-[0.9rem] font-helvetica font-bold rounded-[3px] px-[5px] py-[3px]
                        max-[768px]:text-[0.85rem] max-[768px]:px-2 max-[768px]:py-1`}
          >
            {/* full label on desktop, shorter label on phones */}
            <span className="max-[600px]:hidden">
              {showHints ? 'Hide Hint (Jersey #)' : 'Show Hint (Jersey #)'}
            </span>
            <span className="hidden max-[600px]:inline">
              {showHints ? 'Hide #' : 'Hint #'}
            </span>
          </button>
        </div>

        {/* [&_p]:my-0 removes the paragraph spacing inside Score on mobile so the pill isn't extra tall */}
        <div className={`${column} text-base max-[768px]:[&_p]:my-0`}>
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
              className={`${blueBtn} text-[0.7rem] w-3 h-3 p-0 rounded
                          max-[768px]:w-8 max-[768px]:h-7 max-[768px]:text-sm`}
            >
              {paused ? "►" : "⏸"}
            </button>
          </div>
        )}

        {!stopped && (
          <div className={column}>
            <button
              onClick={handleGiveUp}
              className={`${blueBtn} text-[0.9rem] font-bold rounded-[5px] px-[10px] py-[6px]
                          max-[768px]:text-[0.85rem] max-[768px]:px-2 max-[768px]:py-1`}
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



