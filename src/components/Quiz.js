import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Score from "./Score";
import AnswerInput from "./AnswerInput";
import RosterGrid from "./RosterGrid";

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
    <div className="quiz">
      <div className="quiz-header">
        <div className="column input-box">
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

        <div className="column score-box">
          <Score correct={correct.length} total={totalPlayers} />
        </div>

        <div className="column timer-box">
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
          <div className="column pause-box">
            <button className="pause-btn" onClick={() => setPaused(!paused)}>
              {paused ? "►" : "⏸"}
            </button>
          </div>
        )}

        {!stopped && (
          <div className="column give-up-box">
            <button className="give-up-btn" onClick={handleGiveUp}>
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
      />
    </div>
  );
}



