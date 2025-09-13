import React, { useMemo } from "react";
import "./ResultsScreen.css";

export default function ResultsScreen({ team, correct, teams, elapsedTime }) {
  const totalSecs = Math.ceil(elapsedTime / 1000);
  const minutes = Math.floor(totalSecs / 60);
  const seconds = totalSecs % 60;
  const pad = (n) => (n < 10 ? `0${n}` : n);

  // returns the list of players
  const players = useMemo(() => {
    return team === "all"
      ? teams.flatMap((t) => t.players || [])
      : typeof team === "object"
      ? team.players || []
      : [];
  }, [team, teams]);

  return (
    <div className="results-screen">
      <h1>Quiz Results</h1>
      {team === "all" ? <h2>All Teams</h2> : <h2>{team.team}</h2>}

      <p>
        You guessed <strong>{correct.length}</strong> out of{" "}
        <strong>{players.length}</strong> players!
      </p>
      <p>
        Time: <strong>{minutes}:{pad(seconds)}</strong>
      </p>

      <div className="results-grid">
        {players.map((player) => {
          const guessed = correct.includes(player.playerName);
          return (
            <div
              key={player.playerId}
              className={`player-card ${guessed ? "revealed" : ""}`}
            >
              {player.image && (
                <img
                  src={player.image}
                  alt={player.playerName}
                  className="player-image"
                />
              )}
              <p className="player-name">{player.playerName}</p>
              {!guessed && <p className="missed-label">Missed</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
