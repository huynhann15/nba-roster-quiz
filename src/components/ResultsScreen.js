import React from "react";
import "./ResultsScreen.css";

export default function ResultsScreen({ team, correct, teams }) {
  // determine the list of players to display
  const players =
    team === "all"
      ? teams.flatMap((t) => t.players || [])
      : typeof team === "object"
      ? team.players || []
      : [];

  return (
    <div className="results-screen">
      <h1>Quiz Results</h1>
      {team === "all" ? <h2>All Teams</h2> : <h2>{team.team}</h2>}

      <p>
        You guessed <strong>{correct.length}</strong> out of{" "}
        <strong>{players.length}</strong> players!
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
