import React, { useState, useEffect } from "react";
import { Timer } from "./Timer";
import Score from "./Score";
import AnswerInput from "./AnswerInput";
import RosterGrid from "./RosterGrid";

export default function Quiz({
  selectedTeam,
  correct,
  input,
  setInput,
  handleGuess,
  setEnded,
  duration,
  teams
}) {
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  // Determine total number of players for scoring
  const totalPlayers =
    selectedTeam === "all"
      ? teams.reduce((sum, t) => sum + t.players.length, 0)
      : selectedTeam.players.length;

  // Automatically stop timer when all names are guessed
  useEffect(() => {
    if (correct.length === totalPlayers) {
      setStopped(true);
    }
  }, [correct, totalPlayers]);

  const isInfinite = duration === "infinite";

  return (
    <div className="quiz">
      <div className="status">
        <Score correct={correct.length} total={totalPlayers} />
      </div>
        <Timer
          duration={duration}
          onTimeEnd={() => setEnded(true)}
          paused={paused}
          stopped={stopped}
        />
      <div className="controls">
        {/* Only show pause/resume if not stopped */}
        {!stopped && (
          <button onClick={() => setPaused(!paused)}>
            {paused ? "Resume" : "Pause"}
          </button>
        )}
        {isInfinite && <span style={{ marginLeft: "10px" }}></span>}
      </div>

      <AnswerInput
        input={input}
        setInput={setInput}
        handleGuess={handleGuess}
        disabled={stopped}
      />

      {/* Pass teams array and selectedTeam to RosterGrid */}
      <RosterGrid
        teams={teams}
        selectedTeam={selectedTeam}
        correct={correct}
      />
    </div>
  );
}

