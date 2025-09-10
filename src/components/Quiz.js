import React, { useState, useEffect } from "react";
import { Timer } from "./Timer";
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
}) {
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  const players =
    selectedTeam === "all"
      ? teams.flatMap((t) => t.players || [])
      : selectedTeam?.players || [];

  const totalPlayers = players.length;

  // Stops timer when all names guessed
  useEffect(() => {
    if (correct.length === totalPlayers) {
      setStopped(true);
    }
  }, [correct, totalPlayers]);

  return (
    <div className="quiz">
      <div className="quiz-header">
        <div className="column input-box">
          <AnswerInput
            input={input}
            setInput={setInput}
            handleGuess={handleGuess}
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
            <button
      className="give-up-btn"
      onClick={() => {
        // Get all players for this team
        const allPlayers =
          selectedTeam === "all"
            ? teams.flatMap((t) => t.players || [])
            : selectedTeam?.players || [];

        // Mark all as correct
        setCorrect(allPlayers.map(p => p.playerName));

        // End the quiz
        setEnded(true);
      }}
    >
      Give Up
    </button>
  </div>
)}


      </div>

      <RosterGrid
        teams={teams}
        selectedTeam={selectedTeam || "all"}
        correct={correct}
      />
    </div>
  );
}

