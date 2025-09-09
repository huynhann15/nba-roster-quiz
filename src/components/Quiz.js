import React, { useState, useEffect } from "react";
import { Timer } from "./Timer";
import Score from "./Score";
import AnswerInput from "./AnswerInput";
import RosterGrid from "./RosterGrid";
import './Quiz.css';

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
            <p>Timer:</p>
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
            {paused ? "Resume" : "Pause"}
            </button>
            </div>
            )}
        </div>

      <RosterGrid
        teams={teams}
        selectedTeam={selectedTeam}
        correct={correct}
      />
    </div>
  );
}


