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

  const players =
    selectedTeam ==="all"
    ? teams.flatMap((t) => t.players)
    : selectedTeam.players;

  const totalPlayers = players.length;

  // stops timer when all names guessed
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
        //making players an array
        players={players}
      />
      <RosterGrid
        teams={teams}
        selectedTeam={selectedTeam}
        correct={correct}
      />
    </div>
  );
}

